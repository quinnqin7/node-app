const express = require("express");
const router = express.Router();
const passport = require("passport");
var Profile = require('../../modules/user')
const Patients = require("../../modules/patients")
const jwt = require('jsonwebtoken');
const historyCase = require('../../modules/historyCase')
const mongoose = require('mongoose')
const enterprise = require('../../modules/enterprise')
const doctor = require('../../modules/doctor')
const doctorServiceTime = require('../../modules/doctorServiceTime')
const doctorMessage = require('../../modules/doctorMessage')
const user = require('../../modules/user')
const mail = require('../../config/mail')
const keys = require("../../config/keys");

router.post("/patients", passport.authenticate('jwt', {session: false}), (req, res) => {
	var enterpriseId = jwt.decode(req.body.token).id
	Patients.find({enterpriseId}).then(patientlist => {
		var data = patientlist
		res.json({
			code: 20000,
			data
		})
	}).catch(err => res.status(404).json(err));

});

router.post("/patient", passport.authenticate('jwt', {session: false}), (req, res) => {
	Patients.findOne({_id: req.body.id})
		.then(Patient => {
			var data = Patient.toObject()
			historyCase.find({patientId: req.body.id}).then(his => {
				var history = {his}
				Object.assign(data, history)
				res.json({
					code: 20000,
					data
				})
			}).catch(err => res.status(404).json(err));
		})
		.catch(err => res.status(404).json(err));
})

//createPatient
router.post("/createPatient", passport.authenticate('jwt', {session: false}), (req, res) => {
	var patient = new Patients({
		name: req.body.patientData.name,
		tel: req.body.patientData.tel,
		gender: req.body.patientData.gender,
		enterpriseId: mongoose.Types.ObjectId(req.body.enterpriseId)
	})
	patient.save().then(docs => {
		res.json({
			code: 20000
		})
	}).catch(err => {
		res.status(404).json(err)
	})
})


//updatePatient
// FIXME 这边会爆出一个 mongooose警告
router.post("/updatePatient", passport.authenticate('jwt', {session: false}), (req, res) => {
	var patient = {
		name: req.body.patientData.name,
		tel: req.body.patientData.tel,
		gender: req.body.patientData.gender,
		enterpriseId: mongoose.Types.ObjectId(req.body.enterpriseId)
	}
	var historyCaseToSave = new historyCase({
		mainContent: req.body.patientData.mainContent,
		suggest: req.body.patientData.suggest,
		doctorId: mongoose.Types.ObjectId(req.body.doctorId),
		enterpriseId: mongoose.Types.ObjectId(req.body.enterterpriseId),
		patientId: mongoose.Types.ObjectId(req.body.patientData._id),
		time: new Date()
	})
	if (req.body.doctorId != "") { // 只有医师 才能添加病例
		historyCaseToSave.save().then((docs) => {
			res.json({
				code: 20000
			})
		}).catch(err => {
			res.status(404).json(err)
		})
	}
	Patients.findOneAndUpdate(
		{_id: req.body.patientData._id},
		{$set: patient},
		{new: true}
	).then(profile => {
	}).catch(err => {
		res.status(404).json(err)
	})
})




//getEnterpriseInfo
router.post("/getEnterpriseInfo", passport.authenticate('jwt', {session: false}), (req, res) => {
	enterprise.findOne({_id:mongoose.Types.ObjectId(req.body.enterpriseId)}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});




router.post("/modifyEnterpriseInfo", passport.authenticate('jwt', {session: false}), (req, res) => {
	var enterpriseDatas = req.body.enterpriseData
	var enterprises = {
		name:enterpriseDatas.name,
		tel:enterpriseDatas.tel,
		address:enterpriseDatas.address,
		frequency:enterpriseDatas.frequency,
		numberOfPeople:enterpriseDatas.numberOfPeople,
		enterpriseCategory:enterpriseDatas.enterpriseCategory,
		specialHarm:enterpriseDatas.specialHarm,
		demandPerfession:enterpriseDatas.demandPerfession,
	}
	// var sec = {
	// 	email:doctorDatas.email,
	// 	pwd:doctorDatas.pwd
	// }
	enterprise.findOneAndUpdate(
		{_id: enterpriseDatas._id},
		{$set: enterprises},
		{new: true}
	).then(profile => {
		// user.findOneAndUpdate(
		// 	{_id: doctorDatas._id},
		// 	{$set: sec},
		// 	{new: true}
		// ).then(docs=>{
		// 	res.json({
		// 		code:20000
		// 	})
		res.json({
			code:20000
		})
	}).catch(err => {
		res.status(404).json(err)
	})
});





//getDoctorAndServiceTime
router.post("/getDoctorAndServiceTime", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorServiceTime.find({doctorId:req.body.doctorId,enterpriseId:''}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});



//getDoctors
router.post("/getDoctors", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctor.find({}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});



//enterpriseAppointmentDoctor

router.post("/enterpriseAppointmentDoctor", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(req.body)
	req.body.doctorServiceTimeIdArray.forEach(function(value,index){
		//console.log(value)
var enterpriseid = {
	enterpriseId:req.body.enterpriseId
}
		doctorServiceTime.findOneAndUpdate(
			{_id: value},
			{$set: enterpriseid},
			{new: true}
		).then(profile => {
			if(index === req.body.doctorServiceTimeIdArray.length-1) {
				res.json({
					code: 20000
				})
			}
		}).catch(err => {
			res.status(404).json(err)
		})
	})
});


//sendMessageToDoctor
// 在这边调用邮件  发送功能
router.post("/sendMessageToDoctor", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(req.body)
	// 根据 选定的 时间进行 发送 预约 所以 这边 应该也要 呵呵 ,如果 选定多个时间进行预约呵呵
	req.body.doctorServiceTimeIdArray.forEach(function(value,index){
		var doctorMessageToSave = new doctorMessage({
			mainContent:req.body.mainContent,
			handle:'0',
			doctorServiceTimeId:value,
			enterpriseId:req.body.enterpriseId,
			doctorId:req.body.doctorId,
			agree:'0',
			refuse:'0',
			time:new Date(),
		})

		doctorMessageToSave.save().then(doc=>{
			if(index === req.body.doctorServiceTimeIdArray.length-1) {
				user.findOne({_id:req.body.doctorId}).then(doc=>{
					console.log(doc)
					console.log('发送邮箱')
					const rule={
						id: req.body.doctorId,
						role:doc.role
					};
					jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
						if(err) throw err;
						mail(doc.email,token)
						res.json({
							code: 20000
						})
					})
				}).catch(err=>{
					console.log(err)
				})

			}
		}).catch(err=>{
			console.log(err)
		})
	})
});


//getRefuseData
router.post("/getRefuseData", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorMessage.find({refuse:'1',enterpriseId:req.body.enterpriseId}).then(docs=>{
		var data=docs
		//console.log(data)
		res.json({
			code:20000,
			data
		})
	})
});

//getSignData
router.post("/getSignData", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorServiceTime.find({enterpriseId:req.body.enterpriseId}).then(docs=>{
		var data=docs
		console.log(data)
		res.json({
			code:20000,
			data
		})
	})
});


//sign
router.post("/sign", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorServiceTime.findOneAndUpdate(
		{_id: req.body.doctorServiceTimeId},
		{$set: {sign:req.body.sign}},
		{new: true}
	).then(()=>{
		res.json({
			code:20000,
		})
	}).catch((err)=>{console.log(err)})

	// doctorServiceTime.findAndUpdate({enterpriseId:req.body.enterpriseId}).then(docs=>{
	// 	var data=docs
	// 	console.log(data)
	// 	res.json({
	// 		code:20000,
	// 		data
	// 	})
	// })
});


















// $route GET api/profiles
// @desc 获取所有信息
//@access private
router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.find()
		.then(profile => {
			if (!profile) {
				return res.status(404).json("沒有任何內容");
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
})


//获取详情

router.get("/detail/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
	res.json(req.params.id)
	// Profile.find({id})
	//     .then(profile=>{
	//         if(!profile){
	//             return res.status(404).json("沒有任何內容");
	//         }
	//         res.json(profile);
	//     })
	//     .catch(err=>res.status(404).json(err));
})

// $route GET api/profiles/:id
// @desc 获取单个信息
// @access private
router.get("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {

	Profile.findOne({_id: req.params.id})
		.then(profile => {
			if (!profile) {
				return res.status(404).json("沒有任何內容");
			}
			// res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// $route POST api/profiles/edit
// @desc 编辑信息接口
// @access private
router.post("/edit/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
	const profileFields = {};
	/*判断写入的信息是否能添加*/
	if (req.body.patientId) profileFields.patientId = req.body.patientId;
	if (req.body.patientName) profileFields.patientName = req.body.patientName;
	if (req.body.gender) profileFields.gender = req.body.gender;
	if (req.body.patientPhone) profileFields.patientPhone = req.body.patientPhone;
	if (req.body.description) profileFields.description = req.body.description;
	if (req.body.patientDetails) profileFields.patientDetails = req.body.patientDetails;

	/*
	if(req.body.birthday) profileFields.patientDetails = req.body.birthday;
	if(req.body.patientCompany) profileFields.patientDetails = req.body.patientCompany;
	if(req.body.patientadr) profileFields.patientDetails = req.body.patientadr;
	if(req.body.adrjt) profileFields.patientDetails = req.body.adrjt;
	if(req.body.patAH) profileFields.patientDetails = req.body.patAH;
	if(req.body.patNAH) profileFields.patientDetails = req.body.patNAH;
	if(req.body.linkername) profileFields.patientDetails = req.body.linkername;
	if(req.body.linkertel) profileFields.patientDetails = req.body.linkertel;
	if(req.body.linkrla) profileFields.patientDetails = req.body.linkrla;
	*/

	Profile.findOneAndUpdate(
		{_id: req.params.id},
		{$set: profileFields},
		{new: true}
	).then(profile => res.json(profile))
});


// $route POST api/profiles/delete/:id
// @desc 删除信息接口
//@access private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOneAndRemove({_id: req.params.id})
		.then(profile => {
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json("刪除失敗！"));
});

module.exports = router;
