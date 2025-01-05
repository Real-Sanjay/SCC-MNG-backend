const express = require('express');
const router = express.Router();
const programPlanController = require('../controllers/programPlanController');


// Routes
router.get('/trainerGroup', programPlanController.trainerGroup);
router.post('/', programPlanController.createProgram);
router.get('/', programPlanController.getAllPrograms);
router.get('/:id', programPlanController.getProgramById);
router.put('/:id', programPlanController.updateProgram);
router.delete('/:id', programPlanController.deleteProgram);

module.exports = router;