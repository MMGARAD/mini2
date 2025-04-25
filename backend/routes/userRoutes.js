const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// Add User
router.post('/add', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    
    await user.save();
    res.status(201).json({ 
      success: true,
      user: { email: user.email, createdAt: user.createdAt }
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message.includes('duplicate') 
        ? 'Email already exists' 
        : 'Invalid user data'
    });
  }
});

// Get All Users
router.get('/list', async (req, res) => {
  try {
    const users = await User.find({}, 'email createdAt');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// Delete User
router.delete('/delete/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid user ID format'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({ 
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Server error during deletion'
    });
  }
});

module.exports = router;