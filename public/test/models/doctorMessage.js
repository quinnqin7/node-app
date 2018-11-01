var mongoose = require('./db')
var doctorMessageSchema = mongoose.Schema({
	mainCotent: String,
	doctorServiceTimeId: mongoose.Schema.Types.ObjectId,
	enterpriseId: mongoose.Schema.Types.ObjectId,
	doctorId:mongoose.Schema.Types.ObjectId,
	time: Date,
	handle:String,
	agree:String,
	refuse:String
})

module.exports = mongoose.model('doctorMessage', doctorMessageSchema, 'doctorMessage')
