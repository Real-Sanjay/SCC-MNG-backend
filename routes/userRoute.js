// userRoute.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
  
    // console.log(
    //     bcrypt.compare(password, user.password)
    // )
    //const hashPassword = await(bcrypt.hash(password, 10));
    //console.log(password);
    // console.log(hashPassword);
    //console.log(user.password);
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
      console.log(password);
      // Hash password
      //const hashedPassword = await bcrypt.hash(password, 10);
    //   bcrypt.genSalt(10, function(err, salt) {bcrypt.hash(password, salt, function(err, hash) // Store hash in your password DB.});});
        const salt = await bcrypt.genSalt(10);           
        const hash = await bcrypt.hash(password, salt);       
      //const newUser = new User({      password: hash    });
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
