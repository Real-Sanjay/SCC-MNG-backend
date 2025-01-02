const mongoose = require('mongoose');

const Assessment = new mongoose.Schema({
  traineeName: {
    type: String,
    required: true,
  },
  assessmentScore: {
    type: Number, // Assuming assessmentScore is the score obtained
    required: true,
  },
  percentage: {
    type: Number, // Added the type for percentage
    required: true, // Added the required property
  },
});

const ScoreCardSchema = new mongoose.Schema({
  topicName: { // Corrected the field name to camelCase for consistency
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number, // Added totalMarks field
    required: true,
  },
  SCCTrainee: [Assessment], // This is correct
}, { timestamps: true });

const ScoreCard = mongoose.model('Scores', ScoreCardSchema);

module.exports = ScoreCard;