var mongoose = require('mongoose')var userSchema = mongoose.Schema({    // FIXME 应该从数据库取出来 啊企业 id    email: 'string',    pwd:'string',    role:'string'})module.exports = mongoose.model('User', userSchema, 'users')