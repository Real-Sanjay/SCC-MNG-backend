// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const traineeRoutes = require('./routes/traineeRoute');
// const trainerRoutes = require('./routes/trainerRoute');
// const programRoute = require('./routes/programRoute');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


// // Routes
// app.use('/api/trainees', traineeRoutes);
// app.use('/api/trainers', trainerRoutes);
// app.use('/api/programs', programRoute);


// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Start Server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoute');
const traineeRoutes = require('./routes/traineeRoute');
const trainerRoutes = require('./routes/trainerRoute');
const programRoute = require('./routes/programRoute');

// Middleware to authenticate token
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

//   if (!token) {
//     return res.status(403).json({ message: 'Access denied, no token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = user; // Attach user data from token
//     next(); // Continue to the next middleware or route
//   });
// };
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
const authorizeRole = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ message: 'Access denied, no role found' });
    }

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'You do not have the required permissions' });
    }

    next(); // Continue to the next middleware or route
  };
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200'  // Or '*' to allow all origins
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use('/api/users', userRoutes); // User routes (login, register)
app.use('/api/trainees', authenticateToken, authorizeRole(['Trainee', 'Trainer', 'Admin']), traineeRoutes);
app.use('/api/trainers', authenticateToken, authorizeRole(['Trainer', 'Admin']), trainerRoutes);
app.use('/api/programs', authenticateToken, authorizeRole(['Trainee', 'Trainer', 'Admin']), programRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error: ', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
