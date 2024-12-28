// registerAdmin.js
const mongoose = require('mongoose');
const User = require('./models/userModel'); // Adjust the path as needed
require('dotenv').config(); // Load environment variables

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register a new user
const newUser = new User({ 
  employeeID:'123',
  username: 'admin@solugenix.com',
  password: 'admin123', // This will be hashed automatically by the pre-save middleware
  phoneNo:78797,
  dob:'2002-03-03',
  role: 'Admin',
});

newUser
  .save()
  .then(() => {
    console.log('Admin user registered successfully');
    mongoose.disconnect(); // Disconnect after the operation
  })
  .catch((err) => {
    console.error('Error registering admin user:', err);
    mongoose.disconnect(); // Disconnect even on error
  });
