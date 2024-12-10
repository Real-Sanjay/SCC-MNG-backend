const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgramPlan",
      required: true,
    },
    assessments: [
      {
        name: { type: String, required: true }, // Example: "Module 1 Assessment"
        obtainedScore: { type: Number, required: true },
        totalScore: { type: Number, required: true },
        percentage: { type: Number, required: true },
      },
    ],
    overallRank: { type: String, default: null },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;
