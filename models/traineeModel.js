const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String },
  scores: [
    {
      topic: { type: String },
      score: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trainee', traineeSchema);
