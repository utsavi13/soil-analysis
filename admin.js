const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
        if (err || !admin.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        req.admin = admin;
        next();
    });
};

// Admin login
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find admin
        const [admins] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (admins.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = admins[0];

        // For first-time setup, allow plain password "admin123"
        let validPassword = false;
        if (password === 'admin123' && admin.password.length < 20) {
            validPassword = true;
            // Hash the password for future use
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('UPDATE admins SET password = ? WHERE admin_id = ?', [hashedPassword, admin.admin_id]);
        } else {
            validPassword = await bcrypt.compare(password, admin.password);
        }

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token with admin flag
        const token = jwt.sign(
            { adminId: admin.admin_id, email: admin.email, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin.admin_id,
                username: admin.username,
                email: admin.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get all crops with requirements
router.get('/admin/crops', authenticateAdmin, async (req, res) => {
    try {
        const [crops] = await db.query(`
            SELECT c.crop_id, c.crop_name, 
                   ir.ideal_pH_min, ir.ideal_pH_max,
                   ir.ideal_N, ir.ideal_P, ir.ideal_K
            FROM crops c
            LEFT JOIN ideal_requirements ir ON c.crop_id = ir.crop_id
            ORDER BY c.crop_name
        `);
        res.json({ crops });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch crops' });
    }
});

// Get single crop
router.get('/admin/crops/:id', authenticateAdmin, async (req, res) => {
    try {
        const [crops] = await db.query(`
            SELECT c.crop_id, c.crop_name, 
                   ir.ideal_pH_min, ir.ideal_pH_max,
                   ir.ideal_N, ir.ideal_P, ir.ideal_K
            FROM crops c
            LEFT JOIN ideal_requirements ir ON c.crop_id = ir.crop_id
            WHERE c.crop_id = ?
        `, [req.params.id]);
        
        if (crops.length === 0) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        
        res.json({ crop: crops[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch crop' });
    }
});

// Create new crop
router.post('/admin/crops', authenticateAdmin, async (req, res) => {
    try {
        const { crop_name, ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K } = req.body;

        // Insert crop
        const [cropResult] = await db.query(
            'INSERT INTO crops (crop_name) VALUES (?)',
            [crop_name]
        );

        const cropId = cropResult.insertId;

        // Insert ideal requirements
        await db.query(
            'INSERT INTO ideal_requirements (crop_id, ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K) VALUES (?, ?, ?, ?, ?, ?)',
            [cropId, ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K]
        );

        res.status(201).json({ message: 'Crop added successfully', cropId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add crop' });
    }
});

// Update crop
router.put('/admin/crops/:id', authenticateAdmin, async (req, res) => {
    try {
        const cropId = req.params.id;
        const { crop_name, ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K } = req.body;

        // Update crop name
        await db.query(
            'UPDATE crops SET crop_name = ? WHERE crop_id = ?',
            [crop_name, cropId]
        );

        // Update ideal requirements
        await db.query(
            'UPDATE ideal_requirements SET ideal_pH_min = ?, ideal_pH_max = ?, ideal_N = ?, ideal_P = ?, ideal_K = ? WHERE crop_id = ?',
            [ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K, cropId]
        );

        res.json({ message: 'Crop updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update crop' });
    }
});

// Delete crop
router.delete('/admin/crops/:id', authenticateAdmin, async (req, res) => {
    try {
        await db.query('DELETE FROM crops WHERE crop_id = ?', [req.params.id]);
        res.json({ message: 'Crop deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete crop' });
    }
});

// Get all fertilizers
router.get('/admin/fertilizers', authenticateAdmin, async (req, res) => {
    try {
        const [fertilizers] = await db.query('SELECT * FROM fertilizers ORDER BY fert_name');
        res.json({ fertilizers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch fertilizers' });
    }
});

// Get single fertilizer
router.get('/admin/fertilizers/:id', authenticateAdmin, async (req, res) => {
    try {
        const [fertilizers] = await db.query('SELECT * FROM fertilizers WHERE fert_id = ?', [req.params.id]);
        
        if (fertilizers.length === 0) {
            return res.status(404).json({ error: 'Fertilizer not found' });
        }
        
        res.json({ fertilizer: fertilizers[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch fertilizer' });
    }
});

// Create fertilizer
router.post('/admin/fertilizers', authenticateAdmin, async (req, res) => {
    try {
        const { fert_name, nitrogen_content, phosphorus_content, potassium_content } = req.body;

        const [result] = await db.query(
            'INSERT INTO fertilizers (fert_name, nitrogen_content, phosphorus_content, potassium_content) VALUES (?, ?, ?, ?)',
            [fert_name, nitrogen_content, phosphorus_content, potassium_content]
        );

        res.status(201).json({ message: 'Fertilizer added successfully', fertId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add fertilizer' });
    }
});

// Update fertilizer
router.put('/admin/fertilizers/:id', authenticateAdmin, async (req, res) => {
    try {
        const { fert_name, nitrogen_content, phosphorus_content, potassium_content } = req.body;

        await db.query(
            'UPDATE fertilizers SET fert_name = ?, nitrogen_content = ?, phosphorus_content = ?, potassium_content = ? WHERE fert_id = ?',
            [fert_name, nitrogen_content, phosphorus_content, potassium_content, req.params.id]
        );

        res.json({ message: 'Fertilizer updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update fertilizer' });
    }
});

// Delete fertilizer
router.delete('/admin/fertilizers/:id', authenticateAdmin, async (req, res) => {
    try {
        await db.query('DELETE FROM fertilizers WHERE fert_id = ?', [req.params.id]);
        res.json({ message: 'Fertilizer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete fertilizer' });
    }
});

// Get statistics
router.get('/admin/statistics', authenticateAdmin, async (req, res) => {
    try {
        const [farmers] = await db.query('SELECT COUNT(*) as count FROM farmers');
        const [tests] = await db.query('SELECT COUNT(*) as count FROM soil_tests');
        const [crops] = await db.query('SELECT COUNT(*) as count FROM crops');
        const [fertilizers] = await db.query('SELECT COUNT(*) as count FROM fertilizers');

        res.json({
            stats: {
                totalFarmers: farmers[0].count,
                totalTests: tests[0].count,
                totalCrops: crops[0].count,
                totalFertilizers: fertilizers[0].count
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
