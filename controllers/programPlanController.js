const programPlanService = require('../services/programPlanService');
const Program = require('../models/programPlanModel');
// Create a new program
exports.createProgram = async (req, res) => {
  try {
    const newProgram = await programPlanService.createProgramPlan(req.body);
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programPlans = await programPlanService.getAllProgramPlans();
    res.status(200).json(programPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific program
exports.getProgramById = async (req, res) => {
  try {
    const program = await programPlanService.getProgramPlanById(req.params.id);
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.status(200).json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a program
exports.updateProgram = async (req, res) => {
  try {
    const program = await programPlanService.updateProgramPlan(req.params.id, req.body);
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.status(200).json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    const program = await programPlanService.deleteProgramPlan(req.params.id);
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get programs grouped by trainer
exports.trainerGroup = async (req, res) => {
  try {
    const groupedPrograms = await Program.aggregate([
      {
        $group: {
          _id: '$trainer',
          modules: { $push: '$module' },
          topics: { $push: '$topics' },
          totalDayHour: { $sum: '$dayHour' },
        },
      },
      {
        $project: {
          _id: 0,
          trainer: '$_id',
          modules: 1,
          topics: 1,
          totalDayHour: 1,
        },
      },
    ]);

    res.status(200).json(groupedPrograms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};