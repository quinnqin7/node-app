var GenerUser = require('./user')
var GenerDoctor = require('./doctor')
var GenerEnterprise = require('./enterprise')
var GenerPatient = require('./patientd')

var userModel = require('./models/user')
var doctorModel = require('./models/doctor')
var enterpriseModel = require('./models/enterprise')
var patientModel = require('./models/patients')

//使用方法.先取消註釋執行1.(命令行會出現賬號密碼)  然後在註釋掉      然後在執行2.

//1.
GenerUser(10)

// 3.刪除所有
// userModel.remove({}, (err, doc) => {
//     if (err) {
//         console.log('删除用户数据失败!!')
//     }
//     else {
//         console.log('删除用户数据成功')
//     }

// })
// enterpriseModel.remove({}, (err, doc) => {
//     if (err) {
//         console.log('删除企业数据失败!!')
//     }
//     else {
//         console.log('删除企业数据成功')
//     }
// })
// patientModel.remove({}, (err, doc) => {
//     if (err) {
//         console.log('删除病人数据失败!!')
//     }
//     else {
//         console.log('删除病人数据成功')
//     }
// })




//2.
//查出所有人并且进行角色判断进行 生成
userModel.find({}, (err, docs) => {
     docs.map((data) => {
         //判断是企业的角色
        if (data.role.toString() === '2') {
             GenerEnterprise(1, data._id)
            //生成 患者数据
              GenerPatient(100, data._id)
      }
         if (data.role.toString() === '1') {
              GenerDoctor(1,data._id)
         }
     })
})

 //not use
 //userModel.find({'email':'j.rncrcka@uvdbst.ke'},(err, docs) => {
 //    console.log(docs[0].id)
 //})



