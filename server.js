
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoute');
const traineeRoutes = require('./routes/traineeRoute');
const trainerRoutes = require('./routes/trainerRoute');
const programPlanRoute = require('./routes/programPlanRoute');
const scoresRoute = require('./routes/scorecardRoute')



const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach user data from token
    next();
  });
};



// Middleware to check roles
// const authorizeRole = (requiredRoles) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role;

//     if (!userRole) {
//       return res.status(403).json({ message: 'Access denied, no role found' });
//     }

//     if (requiredRoles && !requiredRoles.includes(userRole)) {
//       return res.status(403).json({ message: 'You do not have the required permissions' });
//     }

//     next(); // Continue to the next middleware or route
//   };
// };

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200'  // Or '*' to allow all origins
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes // authorizeRole(['Trainee', 'Trainer', 'Admin']),
app.use('/api/users', userRoutes); // User routes (login, register)
app.use('/api/trainees', authenticateToken, traineeRoutes);
app.use('/api/trainers', authenticateToken, trainerRoutes);
app.use('/api/programs',  authenticateToken, programPlanRoute);
app.use('/api/scores', authenticateToken, scoresRoute);



app.get('/api/users/user-details', authenticateToken, (req, res) => {
  const { email, role } = req.user; // Assuming these are in the JWT
  res.json({ email, role });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error: ', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
