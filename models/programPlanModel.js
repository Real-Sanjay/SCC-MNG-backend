const programPlanSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
    },
    topics: {
      type: [String], // Array of topics covered in the module
      required: true,
    },
    dayHours: {
      type: Number, // Total hours planned per day
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "10:00 AM - 12:00 PM"
      required: true,
    },
    trainingMode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Trainer assigned to the program
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    referenceNotes: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin who created the program
      required: true,
    },
  },
  { timestamps: true }
);

const ProgramPlan = mongoose.model("ProgramPlan", programPlanSchema);

module.exports = ProgramPlan;
