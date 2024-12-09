const express = require('express');
const router = express.Router();
const programPlanController = require('../controllers/programPlanController');

// CRUD routes for program plans
router.post('/', programPlanController.createProgramPlan);
router.get('/', programPlanController.getAllProgramPlans);
router.get('/:id', programPlanController.getProgramPlanById);
router.put('/:id', programPlanController.updateProgramPlan);
router.delete('/:id', programPlanController.deleteProgramPlan);

module.exports = router;
