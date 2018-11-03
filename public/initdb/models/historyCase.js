var mongoose = require('./db')
var historyCaseSchema = mongoose.Schema({
	mainContent:String,
	suggest:String,
	enterpriseId:mongoose.Schema.Types.ObjectId,
	patientId:mongoose.Schema.Types.ObjectId,
	doctorId:mongoose.Schema.Types.ObjectId,
	time:Date,
})

module.exports = mongoose.model('historyCase', historyCaseSchema, 'historyCase')
