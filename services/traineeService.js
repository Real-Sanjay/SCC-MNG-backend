const Trainee = require('../models/traineeModel');

exports.createTrainee = async(data)=>{
    const trainee = new Trainee(data);
    return await trainee.save();
}


exports.getAllTrainees = async()=>{
    return await Trainee.find();
}

exports.getTraineeById = async(id)=>{
    return await Trainee.findById(id);
}

exports.updateTrainee = async(id,data)=>{
    return await Trainee.findByIdAndUpdate(id,data, { new: true });
}

exports.deleteTrainee = async(id)=>{
    return await Trainee.findByIdAndDelete(id);
}
