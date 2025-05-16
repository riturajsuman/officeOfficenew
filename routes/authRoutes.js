const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - gender
 *         - dateOfBirth
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         company:
 *           type: string
 *           description: Optional company name
 *       example:
 *         name: "Alice"
 *         email: "alice@example.com"
 *         password: "Secret123"
 *         gender: "Female"
 *         dateOfBirth: "1992-05-12"
 *         company: "TechCorp"
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user with name, email, password, gender, and date of birth.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing or invalid fields
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */


// Signup route
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Log in an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "alice@example.com"
 *               password: "Secret123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password required
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

// Login route
router.post('/login', authController.login);

module.exports = router;
