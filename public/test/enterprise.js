var Mock = require('mockjs')var Random = Mock.Randomvar enterprises = require('./models/enterprise')var enterpriseServiceTime = require('./enterpriseServiceTime')//模拟事业单位类型Random.extend({    ids: function (date) {        var constellations = [this.id]        return this.pick(constellations)    },    enterpriseCategory: function (date) {        var constellations = ['事业单位1', '事业单位2', '事业单位3', '事业单位4', '事业单位5', '事业单位6', '事业单位7', '事业单位8']        return this.pick(constellations)    },    demandPerfession: function (date) {        var constellations = ['医师专业1', '医师专业2', '医师专业3', '医师专业4', '医师专业5', '医师专业6', '医师专业7', '医师专业8']        return this.pick(constellations)    }})module.exports = function (num, id) {    for (var i = 0; i < num; i++) {        var data = Mock.mock({            'numberOfPeople': Random.natural(50, 500),            'enterpriseCategory': Random.enterpriseCategory(),            'specialHarm': Random.natural(50, 500),            'frequency': Random.natural(50, 100),            'demandPerfession': Random.demandPerfession(),            'tel': Random.string('number', 11),            'address': Random.cparagraph(3, 4),            'name': Random.csentence(5, 8),            '_id': id.toString()        })        var serviceTime = []        for (var j = 0; j < Random.natural(0, 10); j++) {            var startTime = Random.date()            var endTime = Random.date()            var full = Random.natural(1, 2)            var numberOfPeople = Random.natural(0, 10)            var serviceTimes = {startTime, endTime, full, numberOfPeople}            serviceTime.push(serviceTimes)        }        var c = {serviceTime}        var enterprise = Object.assign(data, c)        //console.log(enterprise)        var enterdb = new enterprises(enterprise)        //存储 企业信息        enterdb.save((err,docs)=>{            if(err){                console.log('添加企业数据失败')                console.log(err)            }            else{                console.log('添加企业数据成功')				enterpriseServiceTime(Random.natural(0,5),docs._id,"")            }        })    }}