var mongoose = require('./db')var enterpriseSchema = mongoose.Schema({    _id:mongoose.Schema.Types.ObjectId,    numberOfPeople: 'string',    enterpriseCategory: 'string',    specialHarm: 'string',    frequency: 'string',    demandPerfession: 'string',    serviceTime: Array,    tel: 'string',    address: 'string',    name: 'string',    lng:'number',    lat:'number',	header:'string'})module.exports = mongoose.model('enterprise', enterpriseSchema, 'enterprise')