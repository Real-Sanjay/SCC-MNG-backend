const ProgramPlan = require('../models/programPlanModel');

// Create a program plan
exports.createProgramPlan = async (data) => {
  const programPlan = new ProgramPlan(data);
  return await programPlan.save();
};

// Get all program plans
exports.getAllProgramPlans = async () => {
  return await ProgramPlan.find().populate('trainers', 'name email');
};

// Get a program plan by ID
exports.getProgramPlanById = async (id) => {
  return await ProgramPlan.findById(id).populate('trainers', 'name email');
};

// Update a program plan
exports.updateProgramPlan = async (id, data) => {
  return await ProgramPlan.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate(
    'trainers',
    'name email'
  );
};

// Delete a program plan
exports.deleteProgramPlan = async (id) => {
  return await ProgramPlan.findByIdAndDelete(id);
};
