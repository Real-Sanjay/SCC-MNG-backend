const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  topicsHandled: [String],
  totalHours: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trainer', trainerSchema);
