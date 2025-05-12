require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// =============================================
// MongoDB Connection
// =============================================
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
})
.then(() => console.log('🔌 Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// =============================================
// Schemas & Models
// =============================================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  company: { type: String, default: '' },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }
});
const User = mongoose.model('User', userSchema);

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  interests: [String],
  availability: {
    type: Map,
    of: [String]
  },
  commutePreferences: {
    direction: { type: String, enum: ['To Office', 'To Home'] },
    days: [String],
    departureTime: String,
    commuteMode: { type: String, enum: ['Drive', 'Carpool', 'Transit', 'Bike', 'Walk'] },
    flexibleTiming: { type: Boolean, default: false }
  }
});
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// =============================================
// Swagger Setup
// =============================================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'APIs for signup, login, and user profile'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }]
  },
  apis: ['./server.js']
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =============================================
// Routes
// =============================================

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - dateOfBirth
 *               - gender
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               company:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
app.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword, dateOfBirth, company, gender } = req.body;

    if (!email || !password || !confirmPassword || !dateOfBirth || !gender)
      return res.status(400).json({ error: 'All required fields must be filled.' });

    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords do not match.' });

    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, dateOfBirth, company, gender });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     dateOfBirth:
 *                       type: string
 *                     company:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     profile:
 *                       type: object
 *                       nullable: true
 */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required.' });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid credentials.' });

    const profile = await UserProfile.findOne({ userId: user._id });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        company: user.company,
        gender: user.gender,
        profile: profile || null
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create or update user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               availability:
 *                 type: object
 *                 additionalProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *               commutePreferences:
 *                 type: object
 *                 properties:
 *                   direction:
 *                     type: string
 *                   days:
 *                     type: array
 *                     items:
 *                       type: string
 *                   departureTime:
 *                     type: string
 *                   commuteMode:
 *                     type: string
 *                   flexibleTiming:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: Profile saved
 */
// POST /profile (Create or update profile using email)
app.post('/profile', async (req, res) => {
  try {
    const { email, interests, availability, commutePreferences } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create or update profile for the user
    const profile = await UserProfile.findOneAndUpdate(
      { userId: user._id },  // Find by the user's ObjectId
      { userId: user._id, interests, availability, commutePreferences },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Profile saved', profile });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

// GET /profile (Retrieve profile using email)
app.get('/profile', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find profile by userId
    const profile = await UserProfile.findOne({ userId: user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});


/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Get user profile by userId
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB User ID
 *     responses:
 *       200:
 *         description: Profile object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Profile not found
 */


// =============================================
// Start Server
// =============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
