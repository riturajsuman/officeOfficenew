// ==========================
// routes/profileRoutes.js
// ==========================
const express = require('express');
const router = express.Router();
const { saveProfile, getProfile } = require('../controllers/profileController');

router.post('/', saveProfile);
router.get('/', getProfile);

module.exports = router;