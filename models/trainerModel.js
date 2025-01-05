const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    trainerName: { type: String, required: true }, // Match Angular's camelCase
    businessUnit: { type: String, required: true },
    status: { type: String, enum: ["Available", "Not Available"], default: "Available" }, // Match Angular's 'status'
    expertise: [{ type: String }], // Array of strings
    module: [{ type: String }], // Array of strings
    topics: [{ type: String }], // Array of strings
    noOfHours: { type: Number }, // Matches Angular's `noOfHours`
  },
  { timestamps: true } // Includes `createdAt` and `updatedAt`
);

const Trainer = mongoose.model("Trainer", trainerSchema);
module.exports = Trainer;