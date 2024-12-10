const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    businessUnit: { type: String, required: true },
    location: { type: String },
    joiningDate: { type: Date, required: true },
    currentStatus: { type: String, enum: ["in training", "completed", "on leave"], default: "in training" },
    batch: { type: String },
    completedPrograms: [
      {
        program: { type: mongoose.Schema.Types.ObjectId, ref: "ProgramPlan" },
        completionDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const Trainee = mongoose.model("Trainee", traineeSchema);
module.exports = Trainee;
