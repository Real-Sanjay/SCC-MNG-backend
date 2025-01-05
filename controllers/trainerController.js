const trainerService = require('../services/trainerService');


// Create a Trainer
exports.createTrainer = async(req, res)=>{
    try{
        const trainer = await trainerService.createTrainer(req.body);
        res.status(201).json({message:'Trainer added successfully', trainer});
    } catch(err){
        res.status(500).json({error: 'An error occurred while adding the trainer'});
    }
}

//get all trainers
exports.getAllTrainers = async(req, res)=>{
    try{
        const trainers = await trainerService.getAllTrainers();
        res.status(200).json(trainers);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

//get specific trainer
exports.getTrainerById = async(req,res)=>{
    try{
        const trainer = await trainerService.getTrainerById(req.params.id);
        if(!trainer) return res.status(404).json({error: 'Trainer not found'});
        res.status(200).json(trainer);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

//update a trainer
exports.updateTrainer = async(req,res)=>{
    try{
        const trainer = await trainerService.updateTrainer(req.params.id, req.body);
        if(!trainer) return res.status(404).json({error: 'Trainer not found'});
        res.status(200).json(trainer);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

//delete a trainer
exports.deleteTrainer = async(req,res)=>{
    try{
        const trainer = await trainerService.deleteTrainer(req.params.id);
        if(!trainer) return res.status(404).json({error: 'Trainer not found'});
        res.status(200).json({message: 'Trainer deleted'});
    } catch(err){
        res.status(500).json({error: err.message}); 
    }
}