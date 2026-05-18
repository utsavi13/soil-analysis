const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get recommendations by test ID
router.get('/recommendations/:testId', authenticateToken, async (req, res) => {
    try {
        const testId = req.params.testId;

        // Get test data
        const [tests] = await db.query(
            'SELECT * FROM soil_tests WHERE test_id = ?',
            [testId]
        );

        if (tests.length === 0) {
            return res.status(404).json({ error: 'Test not found' });
        }

        // Verify ownership
        if (tests[0].farmer_id !== req.user.farmerId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Get recommendations
        const [recommendations] = await db.query(
            'SELECT * FROM recommendations WHERE test_id = ?',
            [testId]
        );

        if (recommendations.length === 0) {
            return res.status(404).json({ error: 'Recommendations not found' });
        }

        const rec = recommendations[0];

        res.json({
            testData: tests[0],
            recommendations: {
                crops: JSON.parse(rec.recommended_crops),
                fertilizers: JSON.parse(rec.fertilizer_suggestions)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

module.exports = router;
