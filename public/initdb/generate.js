var GenerUser = require('./user')var GenerDoctor = require('./doctor')var GenerEnterprise = require('./enterprise')var GenerPatient = require('./patientd')var userModel = require('./models/user')var doctorModel = require('./models/doctor')var enterpriseModel = require('./models/enterprise')var patientModel = require('./models/patients')var doctorServiceTimes = require('./models/doctorServiceTime')var doctorServiceTime = require('./doctorServiceTime')var mongoose = require('mongoose')var program = require('commander');program	.version('0.0.1')	.option('-a, --addusers', '添加用户,如果继续在后面添加,要生成的人数,继续在后面添加 随意字符串,就会生成 管理员')	.option('-g, --generatorinfo', '生成用户数据,以及企业病人的数据')	.option('-d, --delete', '删除全部数据')	//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')	.parse(process.argv);if (program.addusers && process.argv[3]) {	//console.log(process.argv[3])	GenerUser(process.argv[3], process.argv[4]);}// GenerUser(process.argv[3], process.argv[4]);if (program.generatorinfo) {	//查出所有人并且进行角色判断进行 生成	userModel.find({}, (err, docs) => {			docs.map((data) => {				//判断是企业的角色				if (data.role.toString() === '2') {					GenerEnterprise(1, data._id)					//生成 患者数据					GenerPatient(100, data._id)				}				if (data.role.toString() === '1') {					GenerDoctor(1, data._id)				}				if (data.role.toString() === '4') { //将管理员的信息 注册 到 医生的表里边					GenerDoctor(1, data._id)				}			})		}	)};if (program.delete) {	userModel.remove({}, (err, doc) => {		if (err) {			console.log('删除用户数据失败!!')		}		else {			console.log('删除用户数据成功')		}	})	enterpriseModel.remove({}, (err, doc) => {		if (err) {			console.log('删除企业数据失败!!')		}		else {			console.log('删除企业数据成功')		}	})	patientModel.remove({}, (err, doc) => {		if (err) {			console.log('删除病人数据失败!!')		}		else {			console.log('删除病人数据成功')		}	})	doctorModel.remove({}, (err, doc) => {		if (err) {			console.log('删除医生数据失败!!')		}		else {			console.log('删除医生数据成功')		}	})	doctorServiceTimes.remove({}, (err, doc) => {		if (err) {			console.log('删除医生服务时间数据失败!!')		}		else {			console.log('删除医生服务时间数据成功')		}	})};//console.log('  - %s cheese', program.cheese);//3.刪除所有// userModel.remove({}, (err, doc) => {//     if (err) {//         console.log('删除用户数据失败!!')//     }//     else {//         console.log('删除用户数据成功')//     }//// })// enterpriseModel.remove({}, (err, doc) => {//     if (err) {//         console.log('删除企业数据失败!!')//     }//     else {//         console.log('删除企业数据成功')//     }// })// patientModel.remove({}, (err, doc) => {//     if (err) {//         console.log('删除病人数据失败!!')//     }//     else {//         console.log('删除病人数据成功')//     }// })//2.//查出所有人并且进行角色判断进行 生成// userModel.find({}, (err, docs) => {//     docs.map((data) => {//         //判断是企业的角色//         if (data.role.toString() === '2') {//             GenerEnterprise(1, data._id)//             //生成 患者数据//              GenerPatient(100, data._id)//         }//         if (data.role.toString() === '1') {//              GenerDoctor(1,data._id)//         }////     })// }// )// not use// doctorModel.find({'_id':"5bd4b4eb8020372efa10d2c8"},(err, docs) => {//     console.log(docs[0].serviceTime)// })//GenerDoctor(1,"5bd4b4eb8020372efa10d2c8")//GenerPatient(1,"5bd4b4eb8020372efa10d2c0")//GenerEnterprise(1, "5bd4b4eb8020372efa10d2c0")//doctorServiceTime(10,mongoose.Schema.Types.ObjectId("5bd7751e584d7c17f7878e35"))