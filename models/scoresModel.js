const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee", // Links to the Trainee model
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgramPlan", // Links to the Program Plan
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module", // Links to specific module within the program
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic", // Links to specific topic within the module
    },
    assessments: [
      {
        name: { type: String, required: true }, // Dynamic assessment name
        obtainedScore: { type: Number, required: true },
        totalScore: { type: Number, required: true },
        date: { type: Date, default: Date.now }, // Assessment date
      },
    ],
    totalScore: {
      type: Number, // Sum of all `obtainedScore` in `assessments`
      default: 0,
    },
    percentage: {
      type: Number, // Calculated dynamically
    },
    rank: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Middleware to calculate totalScore and percentage before saving
scoreSchema.pre("save", function (next) {
  const totalObtained = this.assessments.reduce((acc, cur) => acc + cur.obtainedScore, 0);
  const totalPossible = this.assessments.reduce((acc, cur) => acc + cur.totalScore, 0);
  this.totalScore = totalObtained;
  this.percentage = totalPossible ? (totalObtained / totalPossible) * 100 : 0;
  next();
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
