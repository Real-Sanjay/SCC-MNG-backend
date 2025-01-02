const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the roles available in the system
const roles = ['Trainee', 'Trainer', 'Admin'];

// Define the User schema
const UserSchema = new mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: roles, // Ensures role is one of the specified values
    default: 'Trainee', // Default role is 'Trainee'
  },
});

// Hash the password before saving the user
// UserSchema.pre('save', async function (next) {
//   try {
//     // If the password is already hashed, skip hashing
//     if (!this.isModified('password')) {
//       return next();
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// Create a method to compare passwords
UserSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
