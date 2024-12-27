require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const traineeRoutes = require('./routes/traineeRoute');
const trainerRoutes = require('./routes/trainerRoute');
const programRoute = require('./routes/programRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


// Routes
app.use('/api/trainees', traineeRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/programs', programRoute);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



///git check
