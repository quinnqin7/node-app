var mongoose = require('mongoose')
mongoose.connect('mongodb://med:med@localhost:27017/med',{ useNewUrlParser: true })

module.exports = mongoose
