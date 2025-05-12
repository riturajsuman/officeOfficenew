const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  dob: String,
  gender: String,
  interests: [String],
});

module.exports = mongoose.model('User', userSchema);
