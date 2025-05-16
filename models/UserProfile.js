const mongoose = require('mongoose');

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

module.exports = mongoose.model('UserProfile', userProfileSchema);
