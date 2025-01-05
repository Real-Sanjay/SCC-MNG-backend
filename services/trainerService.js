const Trainer = require('../models/trainerModel');


//Creats new Trainer
exports.createTrainer = async(data)=>{
    const trainer = new Trainer(data);
    return await trainer.save();
}

//Get all Trainers
exports.getAllTrainers = async()=>{
    return await Trainer.find();
}

//Get Trainer by ID
exports.getTrainerById = async(id)=>{
    return await Trainer.findById(id);
}

//Update Trainer
exports.updateTrainer = async(id, data)=>{
    return await Trainer.findByIdAndUpdate(id,data,{new:true});
}

//Delete Trainer
exports.deleteTrainer = async(id)=>{
    return await Trainer.findByIdAndDelete(id);
}