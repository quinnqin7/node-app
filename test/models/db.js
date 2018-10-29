var mongoose = require('mongoose')
mongoose.connect('mongodb://test:q123456@ds131313.mlab.com:31313/restful-api-prod',{ useNewUrlParser: true })

module.exports = mongoose
