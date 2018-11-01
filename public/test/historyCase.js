// 使用 Mock
var Mock = require('mockjs')
var Random = Mock.Random
var historyCase = require('./models/historyCase')

//生成 几条 病例
module.exports = function (num, enterpriseId, patientId,doctorId) {
	for (var i = 0; i < num; i++) {
		var data = Mock.mock({
			// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
			'mainContent': Random.cparagraph(3, 7),
			'suggest': Random.cparagraph(3, 7),
			'time':Random.date(),
			'enterpriseId': enterpriseId.toString(),
			'patientId':patientId.toString(),
			'doctorId':doctorId.toString()
		})

		var patients = new historyCase(data)
		patients.save((err, doc) => {
			if (err) {
				console.log('插入病人病例失败')
			}
			else {
				console.log('插入病人病例成功')
			}
		})
	}
}
