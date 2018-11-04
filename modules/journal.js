var mongoose = require('./db')
var journalSchema = mongoose.Schema({
	// FIXME 应该从数据库取出来 啊企业 id
	date: 'date',
	content: 'string',
	recipient: 'string',
	title: 'string',
})

module.exports = mongoose.model('journal', journalSchema, 'journal')
