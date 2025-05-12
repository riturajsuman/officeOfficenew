const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  availability: [{
    day: { type: String, required: true },
    timeslots: [{ type: String, required: true }]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Interest', interestSchema);
