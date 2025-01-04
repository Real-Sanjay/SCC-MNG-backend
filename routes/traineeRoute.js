const express = require('express');
const router = express.Router();
const traineeController = require('../controllers/traineeController');


router.post('/', traineeController.createTrainee);
router.get('/', traineeController.getAllTrainees);
router.get('/:id', traineeController.getTraineeById);
router.put('/:id', traineeController.updateTrainee);
router.delete('/:id', traineeController.deleteTrainee);

module.exports = router;
