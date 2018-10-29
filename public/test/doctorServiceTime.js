// 使用 Mock
var Mock = require('mockjs')
var Random = Mock.Random
var doctorServiceTime = require('./models/doctorServiceTime')

module.exports = function (num, enterpriseId, doctorId) {
	for (var i = 0; i < num; i++) {
		var data = Mock.mock({
			// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
			'startTime':Random.date(),
			'endTime':Random.date(),
			'enterpriseId': enterpriseId.toString(),
			'doctorId':doctorId.toString()
		})

		var dst = new doctorServiceTime(data)
		dst.save((err, doc) => {
			if (err) {
				console.log('插入医生服务时间 失败')
			}
			else {
				console.log('插入医生服务时间 成功')
			}
		})
	}
}
