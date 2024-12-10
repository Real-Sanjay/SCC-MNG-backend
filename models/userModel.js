const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Trainer", "Trainee"], required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }); // Optimized querying by email

const User = mongoose.model("User", userSchema);
module.exports = User;
