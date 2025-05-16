// ==========================
// controllers/interestController.js
// ==========================
const Interest = require('../models/Interest');

exports.saveInterest = async (req, res) => {
  try {
    const { email, interests, availability } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    await Interest.findOneAndUpdate(
      { email },
      { $set: { interests, availability, email } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Interests and availability saved successfully' });
  } catch (err) {
    console.error('Interest save error:', err);
    res.status(500).json({ error: 'Failed to save interests' });
  }
};