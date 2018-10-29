var mongoose = require('./db')
var enterPriseServiceTimeSchema = mongoose.Schema({
	startTime: Date,
	endTime: Date,
	enterPriseId: mongoose.Schema.Types.ObjectId,
	doctorId:mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('enterPriseServiceTime', enterPriseServiceTimeSchema, 'enterPriseServiceTime')
