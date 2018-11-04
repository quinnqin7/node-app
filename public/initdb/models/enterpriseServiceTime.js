var mongoose = require('./db')
var enterpriseServiceTimeSchema = mongoose.Schema({
	startTime: Date,
	endTime: Date,
	enterpriseId: mongoose.Schema.Types.ObjectId,
	doctorId:String,
})

module.exports = mongoose.model('enterpriseServiceTime', enterpriseServiceTimeSchema, 'enterpriseServiceTime')
