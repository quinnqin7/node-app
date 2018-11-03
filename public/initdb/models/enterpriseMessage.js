var mongoose = require('./db')
var enterpriseMessageSchema = mongoose.Schema({
	mainCotent: String,
	enterpriseServiceTimeId: mongoose.Schema.Types.ObjectId,
	enterpriseId: mongoose.Schema.Types.ObjectId,
	doctorId:mongoose.Schema.Types.ObjectId,
	Time: Date,
})

module.exports = mongoose.model('enterpriseMessage', enterpriseMessageSchema, 'enterpriseMessage')
