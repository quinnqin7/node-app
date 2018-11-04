var mongoose = require('./db')
var feedBackSchema = mongoose.Schema({
	date: 'date',
	content: 'string',
})

module.exports = mongoose.model('feedBack', feedBackSchema, 'feedBack')
