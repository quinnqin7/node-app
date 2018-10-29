var mongoose = require('./db')
var enterPriseMessageSchema = mongoose.Schema({
	mainCotent: String,
	enterPriseServiceTimeId: mongoose.Schema.Types.ObjectId,
	enterPriseId: mongoose.Schema.Types.ObjectId,
	doctorId:mongoose.Schema.Types.ObjectId,
	Time: Date,
})

module.exports = mongoose.model('enterPriseMessage', enterPriseMessageSchema, 'enterPriseMessage')
