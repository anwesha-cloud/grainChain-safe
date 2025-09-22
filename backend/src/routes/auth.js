const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Signup route
router.post('/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, email, password, role } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: 'Email already registered' });

      const user = new User({ name, email, password, role });
      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
      res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Login route
router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const match = await user.comparePassword(password);
      if (!match) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
