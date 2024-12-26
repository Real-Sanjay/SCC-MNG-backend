const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Routes
router.get('/trainerGroup', programController.trainerGroup); // Specific route first
router.post('/', programController.createProgram);        // Create a new program
router.get('/', programController.getAllPrograms);        // Get all programs
router.get('/:id', programController.getProgramById);     // Get a specific program
router.put('/:id', programController.updateProgram);      // Update a program
router.delete('/:id', programController.deleteProgram);   // Delete a program


module.exports = router;
