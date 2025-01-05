// userRoute.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user ) {
        
        return res.status(400).json({ message: 'Invalid email' });
      }
    if (!bcrypt.compareSync(password, user.password)) {
        
      return res.status(400).json({ message: 'Invalid password' });
    }
  
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });



// New route to handle registration
router.post('/register', async (req, res) => {
    try {
      const { employeeID, email, password, phoneNo, dob, role } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Hash password
        const salt = await bcrypt.genSalt(10);           
        const hash = await bcrypt.hash(password, salt);       
      // Create new user
      const newUser = new User({
        employeeID,
        email,
        password: hash,
        phoneNo,
        dob,
        role,
      });
  
      // Save user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;