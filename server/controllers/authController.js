// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new admin user (optional, for setup)
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashed, isAdmin: true });
    await user.save();

    res.json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login admin
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Verify Token
exports.verifyToken = (req, res) => {
  res.json({ user: req.user });
};
