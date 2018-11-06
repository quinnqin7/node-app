var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/med',{ useNewUrlParser: true })

module.exports = mongoose
