const CommutePreference = require('../models/CommutePreference');

exports.saveCommutePreferences = async (req, res) => {
  try {
    const { email, commutePreferences } = req.body;

    if (!email || !Array.isArray(commutePreferences)) {
      return res.status(400).json({ error: 'Email and commutePreferences are required' });
    }

    res.status(200).json({ message: 'Commute preferences saved successfully' });
  } catch (err) {
    console.error('Error saving commute preferences:', err);
    res.status(500).json({ error: 'Failed to save commute preferences' });
  }
};
