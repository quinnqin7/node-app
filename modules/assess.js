var mongoose = require('./db')
var assessSchema = mongoose.Schema({
	// FIXME 应该从数据库取出来 啊企业 id
	date: 'date',
	content: 'string',
	doctorId: mongoose.Schema.Types.ObjectId,
	caseId: mongoose.Schema.Types.ObjectId,
	rate:Number
})

module.exports = mongoose.model('assess', assessSchema, 'assess')
