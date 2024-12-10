const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessUnit: { type: String, required: true },
  location: { type: String, required: true },
  hiringBusinessUnit: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trainee", traineeSchema);
