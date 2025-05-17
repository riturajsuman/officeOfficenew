const express = require('express');
const router = express.Router();
const { saveCommutePreferences } = require('../controllers/commuteController');

/**
 * @swagger
 * /api/commuteroutes:
 *   post:
 *     summary: Save commute preferences
 *     tags: [Commute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - commutePreferences
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               commutePreferences:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     direction:
 *                       type: string
 *                       enum: [to_office, to_home]
 *                       example: to_office
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Monday", "Tuesday"]
 *                     departureTime:
 *                       type: string
 *                       example: "08:30"
 *                     commuteMode:
 *                       type: string
 *                       enum: [drive, carpool, transit, bike, walk]
 *                       example: carpool
 *                     flexibleTiming:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Commute preferences saved
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Server error
 */
router.post('/', saveCommutePreferences);

module.exports = router;
