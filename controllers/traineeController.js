const traineeService = require('../services/traineeService');

// create a trainee
exports.createTrainee = async(req, res)=>{
    try{
        const trainee = await traineeService.createTrainee(req.body);
        res.status(201).json(trainee);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

// get all trainees
exports.getAllTrainees = async(req,res)=>{
    try{ 
        const trainees = await traineeService.getAllTrainees();
        res.status(200).json(trainees);
    } catch(err){
        res.status(500).json({error:err.message});
    }
}

// get a sepcific trainee
exports.getTraineeById = async(req,res)=>{
    try{
        const trainee = await traineeService.getTraineeById(req.params.id);
        res.status(200).json(trainee);
        if(!trainee) return res.status(404).json({error: 'Trainee not found'});
        res.status(200).json(traineee);
    } catch(err){
        res.status(500).json({error:err.message});
    }
}

//update a trainee
exports.updateTrainee = async(req,res)=>{
    try{
        const trainee = await traineeService.updateTrainee(req.params.id, req.body);
        if(!trainee) return res.status(404).json({error:'Trainee not found'});
        res.status(200).json(trainee);
    } catch(err){
        res.status(500).json({error:err.message});
    }
}

//delete a trainee
exports.deleteTrainee = async(req,res)=>{
    try{
        const trainee = await traineeService.deleteTrainee(req.params.id);
        if(!trainee) return res.status(404).json({error:'Trainee not found'});
        res.status(200).json({message:'Trainee deleted successfully'});
    } catch(err){
        res.status(500).json({error:err.message});
    }
}