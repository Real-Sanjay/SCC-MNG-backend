const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hiringBusinessUnit: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    location: { type: String },
    mappedBusinessUnit: { type: String },
    currentStatus: { type: String, enum: ["In Training", "Completed", "On Leave"], default: "In Training" },
  },
  { timestamps: false }
);

const Trainee = mongoose.model("Trainee", traineeSchema);
module.exports = Trainee;