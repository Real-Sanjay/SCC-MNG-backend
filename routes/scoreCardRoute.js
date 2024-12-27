const express = require('express');
const router = express.Router();
const scorecard=require('../models/scorecardModel');
const scorecardservice=require('../services/scoreCardService');
const scorecardcontroller=require('../controllers/scoreCardController');

//post
router.post('/',scorecardcontroller.createScoreCard);

//get
router.get('/',scorecardcontroller.getScoreCard);
router.get('/:id',scorecardcontroller.getScoreCardById);

//update
router.put('/:id',scorecardcontroller.updateScoreCard);

//delete
router.delete('/:id',scorecardcontroller.deleteScoreCard);

module.exports=router;

