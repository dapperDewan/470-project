import express from 'express';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = process.env.JWT_SECRET || 'supersecretkey';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const isAdmin = username.toLowerCase() === 'araav';
    const user = new User({ username, password: hashed, isAdmin });
    await user.save();
    // Issue JWT token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.json({ username: user.username, isAdmin: user.isAdmin, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    // Issue JWT token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.json({ username: user.username, isAdmin: user.isAdmin, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
