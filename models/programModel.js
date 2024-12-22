const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  module: { type: String, required: true },
  topics: { type: [String], required: true }, // Array of topics
  dayHour: { type: Number, required: true }, // Total hours for the day
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String, required: true }, // Example: '10:00 AM 
  endTime: { type: String, required: true }, // Example: '10:00 AM 
  trainingMode: { type: String, enum: ['Online', 'Offline'], required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, // Reference to Trainer model
  status: { type: String, enum: ['Scheduled', 'Ongoing', 'Completed'], default: 'Scheduled' },
  referenceNotes: { type: String }, // Optional
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Program', ProgramSchema);
