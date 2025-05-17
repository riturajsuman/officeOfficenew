const mongoose = require('mongoose');

const commuteSchema = new mongoose.Schema({
  direction: {
    type: String,
    enum: ['to_office', 'to_home'],
    required: true,
  },
  days: [String],
  departureTime: String,
  commuteMode: {
    type: String,
    enum: ['drive', 'carpool', 'transit', 'bike', 'walk'],
  },
  flexibleTiming: Boolean
});

const CommutePreferenceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  commutePreferences: [commuteSchema],
}, { timestamps: true });

module.exports = mongoose.model('CommutePreference', CommutePreferenceSchema);
