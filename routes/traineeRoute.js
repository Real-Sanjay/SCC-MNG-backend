const express = require('express');
const router = express.Router();
const Trainee = require('../models/traineeModel');

// Create a Trainee
router.post('/', async (req, res) => {
  try {
    const trainee = new Trainee(req.body);
    await trainee.save();
    res.status(201).json(trainee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Trainees
router.get('/', async (req, res) => {
  try {
    const trainees = await Trainee.find();
    res.status(200).json(trainees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a Trainee by ID
router.get('/:id', async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.params.id);
    if (!trainee) return res.status(404).json({ error: 'Trainee not found' });
    res.status(200).json(trainee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Trainee
router.put('/:id', async (req, res) => {
  try {
    const trainee = await Trainee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainee) return res.status(404).json({ error: 'Trainee not found' });
    res.status(200).json(trainee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Trainee
router.delete('/:id', async (req, res) => {
  try {
    const trainee = await Trainee.findByIdAndDelete(req.params.id);
    if (!trainee) return res.status(404).json({ error: 'Trainee not found' });
    res.status(200).json({ message: 'Trainee deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
