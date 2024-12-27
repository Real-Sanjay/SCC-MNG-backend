const scorecard=require('../models/scorecardModel');
const scorecardservice=require('../services/scoreCardService');

exports.createScoreCard= async (req,res)=>{
    try{
        const scorecard=await scorecardservice.createScoreCard(req.body);
        res.status(201).json({ message: 'Score card created successfully', scorecard });

    }
    catch{
        res.status(400).json({ message: 'Error while creating Score card', error: err.message });
    }
}
exports.getScoreCard=async (req,res)=>{
    try {
        const scorecard = await scorecardservice.getScoreCard();
        res.status(200).json(scorecard);
      } catch (err) {
        res.status(500).json({ message: 'Error while fetching score card', error: err.message });
      }
}
exports.getScoreCardById=async (req,res)=>{
    try{
        const scorecard=await scorecardservice.getScoreCardById(req.params.id);
        if(!scorecard) return res.status(404).json({message:'Score card not found'});
        res.status(200).json(scorecard);
    }
    catch(err){
        res.status(500).json({message:'Error fetching score crd by Id',error:err.message});
    }
}
exports.updateScoreCard=async (req,res)=>{
    try{
        const scorecard=await scorecardservice.updateScoreCard(req.params.id,req.body);
        if(!scorecard) return res.status(404).json({message:'Score card not found'});
        res.status(200).json({message:'Score Card updated successfully',scorecard});
    }
    catch(err){
        res.status(500).json({message:'Error while updating Score card',error:err.message});
    }
}
exports.deleteScoreCard=async (req,res)=>{
    try{
        const scorecard= await scorecardservice.deleteScoreCard(req.params.id);
        if(!scorecard) return res.status(404).json({message:'Score card not found'});
        res.status(200).json({message:'Score card deleted succcessfully.'});
        console.log('deleted');
    }
    catch(err){
        res.status(500).json({message:'Error while deleting Score card.',error:err.message});
    }
}
