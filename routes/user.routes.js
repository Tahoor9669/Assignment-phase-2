const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this to your 'user.routes.js' file

// Send a chat message
router.post('/chat/send', verifyToken, async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      return res.status(400).json({ message: 'Username and message text are required.' });
    }

    // Save message in the database or send it (depending on your implementation)
    const message = { username, text, timestamp: new Date() };  // Mock message object

    // For now, just log the message or store it in an array (implement actual DB logic later)
    console.log('Message received:', message);

    res.status(200).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Example of a protected route using the verifyToken middleware
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route',
    userId: req.user.userId,
  });
});

// Promote a user to GroupAdmin (SuperAdmin only)
router.put('/promote/group-admin/:userId', verifyToken, hasRole('SuperAdmin'), async (req, res) => {
  try {
    // Trim the userId to remove any leading/trailing whitespace
    const userId = req.params.userId.trim(); 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.roles.includes('GroupAdmin')) {
      user.roles.push('GroupAdmin');
      await user.save();
    }
    res.status(200).json({ message: 'User promoted to GroupAdmin', roles: user.roles });
  } catch (error) {
    console.error('Error promoting user to GroupAdmin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Promote a user to SuperAdmin (SuperAdmin only)
router.put('/promote/super-admin/:userId', verifyToken, hasRole('SuperAdmin'), async (req, res) => {
  try {
    // Trim the userId to remove any leading/trailing whitespace
    const userId = req.params.userId.trim(); 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.roles.includes('SuperAdmin')) {
      user.roles.push('SuperAdmin');
      await user.save();
    }
    res.status(200).json({ message: 'User promoted to SuperAdmin', roles: user.roles });
  } catch (error) {
    console.error('Error promoting user to SuperAdmin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
