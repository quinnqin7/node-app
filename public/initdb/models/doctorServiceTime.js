var mongoose = require('./db')
var doctorServiceTimeSchema = mongoose.Schema({
	startTime: Date,
	endTime: Date,
	enterpriseId: String,
	doctorId:mongoose.Schema.Types.ObjectId,
	sign:String
})

module.exports = mongoose.model('doctorServiceTime', doctorServiceTimeSchema, 'doctorServiceTime')
