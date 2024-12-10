const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    businessUnit: { type: String, required: true },
    expertise: [{ type: String }], 
    isAvailable: { type: Boolean, default: true },
    assignedPrograms: [
      {
        program: { type: mongoose.Schema.Types.ObjectId, ref: "ProgramPlan" },
        module: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", trainerSchema);
module.exports = Trainer;
