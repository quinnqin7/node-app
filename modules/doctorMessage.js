var mongoose = require('./db')
var doctorMessageSchema = mongoose.Schema({
	mainCotent: String,
	doctorServiceTimeId: mongoose.Schema.Types.ObjectId,
	enterpriseId: mongoose.Schema.Types.ObjectId,
	doctorId:mongoose.Schema.Types.ObjectId,
	Time: Date,
})

module.exports = mongoose.model('doctorMessage', doctorMessageSchema, 'doctorMessage')
