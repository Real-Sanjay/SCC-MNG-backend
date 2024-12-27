const ScoreCard=require('../models/scorecardModel')

exports.createScoreCard= async (data)=>{
    const scorecard=new ScoreCard(data);
    return await scorecard.save();
}
exports.getScoreCard=async (data)=>{
    return await ScoreCard.find();
}
exports.getScoreCardById= async (id)=>{
    return await ScoreCard.findById(id);
}
exports.updateScoreCard=async (id,data)=>{
    return await ScoreCard.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}
exports.deleteScoreCard=async(id)=>{
    return await ScoreCard.findByIdAndDelete(id);
}