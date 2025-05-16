/**
 * @swagger
 * /api/interest:
 *   post:
 *     summary: Save user interests and availability
 *     description: Store user interests and availability for scheduling or matchmaking purposes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               availability:
 *                 type: object
 *                 properties:
 *                   days:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Monday", "Wednesday"]
 *                   time:
 *                     type: string
 *                     example: "Evenings"
 *             example:
 *               email: "alice@example.com"
 *               interests: ["music", "yoga", "coding"]
 *               availability:
 *                 days: ["Monday", "Wednesday"]
 *                 time: "Evenings"
 *     responses:
 *       200:
 *         description: Interests and availability saved successfully
 *       400:
 *         description: Email is required
 *       500:
 *         description: Server error
 */


const express = require('express');
const router = express.Router();
const { saveInterest } = require('../controllers/interestController');

router.post('/', saveInterest);

module.exports = router;