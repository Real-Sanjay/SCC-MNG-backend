const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  module: { type: String, required: true },
  topics: { type: [String], required: true }, // Array of topics
  dayHour: { type: Number, required: true }, // Total hours for the day
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  startTime: { type: String, required: true }, // Example: '10:00 AM 
  endTime: { type: String, required: true }, // Example: '10:00 AM 
  trainingMode: { type: String, enum: ['Online', 'Offline'], required: true },
  trainer: { type:String, required: true }, 
  status: { type: String, enum: ['Scheduled', 'Cancelled', 'Completed'],  },
  referenceNotes: { type: String }, // Optional
},
{
  timestamps: true, // Adds createdAt and updatedAt fields
}
);

module.exports = mongoose.model('Program', ProgramSchema);