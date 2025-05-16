// ==========================
// controllers/profileController.js
// ==========================
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

exports.saveProfile = async (req, res) => {
  try {
    const { email, interests, availability, commutePreferences } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const profile = await UserProfile.findOneAndUpdate(
      { userId: user._id },
      { userId: user._id, interests, availability, commutePreferences },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Profile saved', profile });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const profile = await UserProfile.findOne({ userId: user._id });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};