const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainerModel');

// Create a Trainer
router.post('/', async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a Trainer by ID
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.status(200).json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Trainer
router.put('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.status(200).json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Trainer
router.delete('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.status(200).json({ message: 'Trainer deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
