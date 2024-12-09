const mongoose = require('mongoose');

const programPlanSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true,
    },
    topics: {
      type: [String], // Array of topics
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Example: "10:00 AM - 12:00 PM"
      required: true,
    },
    trainingMode: {
      type: String, // Example: "Online" or "Offline"
      required: true,
    },
    trainers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer', // Reference to the Trainer model
        required: true,
      },
    ],
    references: {
      type: String, // Links or notes
      default: '',
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

module.exports = mongoose.model('ProgramPlan', programPlanSchema);
