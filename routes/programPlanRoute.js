const express = require('express');
const router = express.Router();
const programPlanController = require('../controllers/programPlanController');

// Routes
router.get('/trainerGroup', programPlanController.trainerGroup); // Specific route first
router.post('/', programPlanController.createProgram);        // Create a new program
router.get('/', programPlanController.getAllPrograms);        // Get all programs
router.get('/:id', programPlanController.getProgramById);     // Get a specific program
router.put('/:id', programPlanController.updateProgram);      // Update a program
router.delete('/:id', programPlanController.deleteProgram);   // Delete a program


module.exports = router;