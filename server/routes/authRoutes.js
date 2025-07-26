// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register (optional)
router.post('/register', register);

// Login to get a JWT
router.post('/login', login);

// Verify token
router.get('/verify', authMiddleware, verifyToken);

module.exports = router;
