const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const authRouter = express.Router();

// Register
authRouter.post('/register', async (req, res) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword
    });

    res.status(200).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
authRouter.post('/login', async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, config.secret);

    console.log(token);
    // Save token to user
    user.token = token;
    await user.save();

    res.header('auth-token', token).json({ message: "Logged in successfully", token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout
authRouter.post('/logout', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    user.token = '';
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;