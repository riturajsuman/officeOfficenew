const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  company: { type: String, default: '' },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }
});

module.exports = mongoose.model('User', userSchema);