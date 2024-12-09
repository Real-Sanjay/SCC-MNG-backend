const programPlanService = require('../services/programPlanService');
const Trainer = require('../models/trainerModel');


// Create a program plan
exports.createProgramPlan = async (req, res) => {
  try {
    // Validate trainers
    const trainerIds = req.body.trainers;
    const validTrainers = await Trainer.find({ _id: { $in: trainerIds } });
    if (validTrainers.length !== trainerIds.length) {
      return res.status(400).json({ message: 'Invalid trainer IDs provided' });
    }

    // Create program plan
    const programPlan = await programPlanService.createProgramPlan(req.body);
    res.status(201).json({ message: 'Program Plan created successfully', programPlan });
  } catch (err) {
    res.status(400).json({ message: 'Error creating Program Plan', error: err.message });
  }
};

// exports.createProgramPlan = async (req, res) => {
//   try {
//     const programPlan = await programPlanService.createProgramPlan(req.body);
//     res.status(201).json({ message: 'Program Plan created successfully', programPlan });
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating Program Plan', error: err.message });
//   }
// };

// Get all program plans
exports.getAllProgramPlans = async (req, res) => {
  try {
    const programPlans = await programPlanService.getAllProgramPlans();
    res.status(200).json(programPlans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Program Plans', error: err.message });
  }
};

// Get a program plan by ID
exports.getProgramPlanById = async (req, res) => {
  try {
    const programPlan = await programPlanService.getProgramPlanById(req.params.id);
    if (!programPlan) return res.status(404).json({ message: 'Program Plan not found' });
    res.status(200).json(programPlan);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Program Plan', error: err.message });
  }
};

// Update a program plan
exports.updateProgramPlan = async (req, res) => {
  try {
    const programPlan = await programPlanService.updateProgramPlan(req.params.id, req.body);
    if (!programPlan) return res.status(404).json({ message: 'Program Plan not found' });
    res.status(200).json({ message: 'Program Plan updated successfully', programPlan });
  } catch (err) {
    res.status(400).json({ message: 'Error updating Program Plan', error: err.message });
  }
};

// Delete a program plan
exports.deleteProgramPlan = async (req, res) => {
  try {
    const programPlan = await programPlanService.deleteProgramPlan(req.params.id);
    if (!programPlan) return res.status(404).json({ message: 'Program Plan not found' });
    res.status(200).json({ message: 'Program Plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Program Plan', error: err.message });
  }
};
