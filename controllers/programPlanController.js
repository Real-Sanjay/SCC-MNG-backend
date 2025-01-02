const Program = require('../models/programPlanModel');
const Trainer = require('../models/trainerModel');

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    const { module, topics, dayHour, startDate, endDate, startTime, endTime, trainingMode, trainer, status, referenceNotes } = req.body;
     
    // Validate trainer exists
    // const trainerExists = await Trainer.findOne();
    // if (!trainerExists) {
    //   return res.status(404).json({ error: 'Trainer not found' });
    // }

    const program = new Program({
      module,
      topics,
      dayHour,
      startDate,
      endDate,
      startTime,
      endTime,
      trainingMode,
      trainer,
      status,
      referenceNotes,
    });

    await program.save();
    res.status(201).json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate('trainer', 'name email expertise'); // Populate trainer details
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific program
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate('trainer', 'name email expertise');
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a program
exports.updateProgram = async (req, res) => {
  try {
    const { trainer } = req.body;
    console.log(req.body);

    // Validate trainer if being updated
    // if (trainer) {
    //   const trainerExists = await Trainer.findById(trainer);
    //   if (!trainerExists) {
    //     return res.status(404).json({ error: 'Trainer not found' });
    //   }
    // }

    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.json({ message: 'Program deleted successfully' });
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
          _id: "$trainer",
          modules: { $push: "$module" },
          topics: { $push: "$topics" },
          totalDayHour: { $sum: "$dayHour" }
        }
      },
      {
        $project: {
          _id: 0,
          trainer: "$_id",
          modules: 1,
          topics: 1,
          totalDayHour: 1
        }
      }
    ]);

    res.json(groupedPrograms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};