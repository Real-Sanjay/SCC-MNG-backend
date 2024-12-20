const mongoose = require('mongoose');
sanjay
const programPlanSchema = new mongoose.Schema({
  programName: {
    type: String,
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
  modules: [{
    moduleName: String,
    topics: [{
      topicName: String,
      day: Number,
      hour: Number,
      startTime: Date,
      endTime: Date,
      trainingMode: String,
    }],
  }],
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
  },
  trainees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active',
  },
}, { timestamps: true });

const ProgramPlan = mongoose.model('ProgramPlan', programPlanSchema);

module.exports = ProgramPlan;
