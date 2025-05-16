// ==========================
// controllers/authController.js
// ==========================
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, company, gender } = req.body;

    if (!name || !email || !password || !dateOfBirth || !gender)
      return res.status(400).json({ error: 'All required fields must be filled.' });

    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'Email already registered.' });


    const user = new User({ name, email, password, dateOfBirth, company, gender });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials.' });

    res.json({
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
};