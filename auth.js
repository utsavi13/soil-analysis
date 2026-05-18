const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Register new farmer
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if email already exists
        const [existing] = await db.query('SELECT * FROM farmers WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert farmer
        const [result] = await db.query(
            'INSERT INTO farmers (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword]
        );

        res.status(201).json({
            message: 'Farmer registered successfully',
            farmerId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login farmer
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find farmer
        const [farmers] = await db.query('SELECT * FROM farmers WHERE email = ?', [email]);
        
        if (farmers.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const farmer = farmers[0];

        // Verify password
        const validPassword = await bcrypt.compare(password, farmer.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { farmerId: farmer.farmer_id, email: farmer.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            farmer: {
                id: farmer.farmer_id,
                name: farmer.name,
                email: farmer.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
