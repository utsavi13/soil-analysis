const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Submit soil test
router.post('/soil-test', authenticateToken, async (req, res) => {
    try {
        const { pH, nitrogen, phosphorus, potassium } = req.body;
        const farmerId = req.user.farmerId;

        // Validate input
        if (!pH || !nitrogen || !phosphorus || !potassium) {
            return res.status(400).json({ error: 'All soil parameters are required' });
        }

        // Insert soil test
        const [result] = await db.query(
            'INSERT INTO soil_tests (farmer_id, pH, nitrogen, phosphorus, potassium) VALUES (?, ?, ?, ?, ?)',
            [farmerId, pH, nitrogen, phosphorus, potassium]
        );

        const testId = result.insertId;

        // Generate recommendations
        const recommendations = await generateRecommendations(testId, pH, nitrogen, phosphorus, potassium);

        // Store recommendations
        await db.query(
            'INSERT INTO recommendations (test_id, recommended_crops, fertilizer_suggestions) VALUES (?, ?, ?)',
            [testId, JSON.stringify(recommendations.crops), JSON.stringify(recommendations.fertilizers)]
        );

        res.status(201).json({
            message: 'Soil test submitted successfully',
            testId,
            recommendations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit soil test' });
    }
});

// Get farmer's test history
router.get('/reports/:farmerId', authenticateToken, async (req, res) => {
    try {
        const farmerId = req.params.farmerId;

        // Verify farmer owns these reports
        if (req.user.farmerId != farmerId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        const [tests] = await db.query(
            `SELECT st.*, r.recommended_crops, r.fertilizer_suggestions 
             FROM soil_tests st 
             LEFT JOIN recommendations r ON st.test_id = r.test_id 
             WHERE st.farmer_id = ? 
             ORDER BY st.test_date DESC`,
            [farmerId]
        );

        res.json({ reports: tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

// Update soil test
router.put('/soil-test/:testId', authenticateToken, async (req, res) => {
    try {
        const testId = req.params.testId;
        const { pH, nitrogen, phosphorus, potassium } = req.body;
        const farmerId = req.user.farmerId;

        // Validate input
        if (!pH || !nitrogen || !phosphorus || !potassium) {
            return res.status(400).json({ error: 'All soil parameters are required' });
        }

        // Verify ownership
        const [existing] = await db.query(
            'SELECT farmer_id FROM soil_tests WHERE test_id = ?',
            [testId]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Test not found' });
        }

        if (existing[0].farmer_id !== farmerId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Update soil test
        await db.query(
            'UPDATE soil_tests SET pH = ?, nitrogen = ?, phosphorus = ?, potassium = ? WHERE test_id = ?',
            [pH, nitrogen, phosphorus, potassium, testId]
        );

        // Delete old recommendations
        await db.query('DELETE FROM recommendations WHERE test_id = ?', [testId]);

        // Generate new recommendations
        const recommendations = await generateRecommendations(testId, pH, nitrogen, phosphorus, potassium);

        // Store new recommendations
        await db.query(
            'INSERT INTO recommendations (test_id, recommended_crops, fertilizer_suggestions) VALUES (?, ?, ?)',
            [testId, JSON.stringify(recommendations.crops), JSON.stringify(recommendations.fertilizers)]
        );

        res.json({
            message: 'Soil test updated successfully',
            testId,
            recommendations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update soil test' });
    }
});

// Delete soil test
router.delete('/soil-test/:testId', authenticateToken, async (req, res) => {
    try {
        const testId = req.params.testId;
        const farmerId = req.user.farmerId;

        // Verify ownership
        const [existing] = await db.query(
            'SELECT farmer_id FROM soil_tests WHERE test_id = ?',
            [testId]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Test not found' });
        }

        if (existing[0].farmer_id !== farmerId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Delete test (recommendations will be deleted automatically due to CASCADE)
        await db.query('DELETE FROM soil_tests WHERE test_id = ?', [testId]);

        res.json({ message: 'Soil test deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete soil test' });
    }
});   

// Recommendation Algorithm
async function generateRecommendations(testId, pH, nitrogen, phosphorus, potassium) {
    try {
        // Fetch all crops with their ideal requirements
        const [crops] = await db.query(`
            SELECT c.crop_id, c.crop_name, 
                   ir.ideal_pH_min, ir.ideal_pH_max, 
                   ir.ideal_N, ir.ideal_P, ir.ideal_K
            FROM crops c
            JOIN ideal_requirements ir ON c.crop_id = ir.crop_id
        `);

        // Calculate suitability for each crop
        const cropScores = crops.map(crop => {
            let score = 0;
            let deviations = {};

            // pH check
            const pHInRange = pH >= crop.ideal_pH_min && pH <= crop.ideal_pH_max;
            if (pHInRange) {
                score += 100;
            } else {
                const pHDeviation = pH < crop.ideal_pH_min ? 
                    crop.ideal_pH_min - pH : pH - crop.ideal_pH_max;
                score -= pHDeviation * 20;
            }

            // NPK deviation calculation (lower deviation = better)
            const nDeviation = Math.abs(nitrogen - crop.ideal_N);
            const pDeviation = Math.abs(phosphorus - crop.ideal_P);
            const kDeviation = Math.abs(potassium - crop.ideal_K);

            score -= (nDeviation + pDeviation + kDeviation) / 3;

            deviations = {
                nitrogen: nitrogen - crop.ideal_N,
                phosphorus: phosphorus - crop.ideal_P,
                potassium: potassium - crop.ideal_K
            };

            return {
                cropId: crop.crop_id,
                cropName: crop.crop_name,
                score,
                deviations,
                idealRequirements: {
                    pH: `${crop.ideal_pH_min}-${crop.ideal_pH_max}`,
                    N: crop.ideal_N,
                    P: crop.ideal_P,
                    K: crop.ideal_K
                }
            };
        });

        // Sort by score and get top 5
        cropScores.sort((a, b) => b.score - a.score);
        const topCrops = cropScores.slice(0, 5);

        // Generate fertilizer recommendations
        const fertilizerRecommendations = await generateFertilizerRecommendations(
            nitrogen, phosphorus, potassium, topCrops[0]
        );

        return {
            soilData: { pH, nitrogen, phosphorus, potassium },
            crops: topCrops,
            fertilizers: fertilizerRecommendations
        };
    } catch (error) {
        console.error('Recommendation generation error:', error);
        throw error;
    }
}

async function generateFertilizerRecommendations(soilN, soilP, soilK, bestCrop) {
    try {
        const [fertilizers] = await db.query('SELECT * FROM fertilizers');
        
        const recommendations = [];
        const deficiencies = bestCrop.deviations;

        // Nitrogen deficiency
        if (deficiencies.nitrogen < -10) {
            const nFerts = fertilizers
                .filter(f => f.nitrogen_content > 20)
                .sort((a, b) => b.nitrogen_content - a.nitrogen_content);
            
            if (nFerts.length > 0) {
                recommendations.push({
                    nutrient: 'Nitrogen',
                    deficiency: Math.abs(deficiencies.nitrogen).toFixed(2),
                    status: 'Low',
                    fertilizer: nFerts[0].fert_name,
                    composition: `${nFerts[0].nitrogen_content}% N`,
                    estimatedAmount: `${Math.ceil(Math.abs(deficiencies.nitrogen) / nFerts[0].nitrogen_content * 100)} kg/hectare`
                });
            }
        }

        // Phosphorus deficiency
        if (deficiencies.phosphorus < -10) {
            const pFerts = fertilizers
                .filter(f => f.phosphorus_content > 15)
                .sort((a, b) => b.phosphorus_content - a.phosphorus_content);
            
            if (pFerts.length > 0) {
                recommendations.push({
                    nutrient: 'Phosphorus',
                    deficiency: Math.abs(deficiencies.phosphorus).toFixed(2),
                    status: 'Low',
                    fertilizer: pFerts[0].fert_name,
                    composition: `${pFerts[0].phosphorus_content}% P`,
                    estimatedAmount: `${Math.ceil(Math.abs(deficiencies.phosphorus) / pFerts[0].phosphorus_content * 100)} kg/hectare`
                });
            }
        }

        // Potassium deficiency
        if (deficiencies.potassium < -10) {
            const kFerts = fertilizers
                .filter(f => f.potassium_content > 20)
                .sort((a, b) => b.potassium_content - a.potassium_content);
            
            if (kFerts.length > 0) {
                recommendations.push({
                    nutrient: 'Potassium',
                    deficiency: Math.abs(deficiencies.potassium).toFixed(2),
                    status: 'Low',
                    fertilizer: kFerts[0].fert_name,
                    composition: `${kFerts[0].potassium_content}% K`,
                    estimatedAmount: `${Math.ceil(Math.abs(deficiencies.potassium) / kFerts[0].potassium_content * 100)} kg/hectare`
                });
            }
        }

        // If no major deficiencies, recommend balanced fertilizer
        if (recommendations.length === 0) {
            const balanced = fertilizers.find(f => f.fert_name.includes('20-20-20'));
            if (balanced) {
                recommendations.push({
                    nutrient: 'Balanced',
                    status: 'Normal',
                    fertilizer: balanced.fert_name,
                    composition: `${balanced.nitrogen_content}-${balanced.phosphorus_content}-${balanced.potassium_content}`,
                    estimatedAmount: '50 kg/hectare (maintenance dose)'
                });
            }
        }

        return recommendations;
    } catch (error) {
        console.error('Fertilizer recommendation error:', error);
        return [];
    }
}

module.exports = router;
