//@profile
const express = require("express");
const router = express.Router();
const passport = require("passport");
var Profile = require('../../modules/user')
const Patients = require("../../modules/patients")
const jwt = require('jsonwebtoken');
const historyCase = require('../../modules/historyCase')
const doctorServiceTime = require('../../modules/doctorServiceTime')
const enterprise = require('../../modules/enterprise')
const mongoose = require('mongoose')
const Doctor = require('../../modules/doctor')
const user = require('../../modules/user')
const doctorMessage = require('../../modules/doctorMessage')
const Journal = require('../../modules/journal')
const feedback = require('../../modules/feedback')







//submitJournal 提交公告
router.post("/submitJournal", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(req.body)
if(jwt.decode(req.body.token).role === '4'){
	var Journalontent = new Journal({
		date:new Date(),
		content:req.body.content,
		recipient:req.body.recipient,
		title:req.body.title,
	})
	Journalontent.save().then(doc=>{
		//console.log(doc)
		res.json({
			code:20000
		})
	}).catch(err=>{
		//consoel.log(err)
		res.status(404).json(err)
	})
}else{
	res.status(404).json(err)
}
});


//getJournalList
router.post("/getJournalList", passport.authenticate('jwt', {session: false}), (req, res) => {
	Journal.find({},{title:1,date:1,_id:1}).then(data=>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('获取公告错误')
	})
});

//fetchJournalContent
router.post("/fetchJournalContent", passport.authenticate('jwt', {session: false}), (req, res) => {
	Journal.findOne({_id:req.body.journalId}).then(data=>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('获取公告错误')
	})
});


//updateJournal
router.post("/updateJournal", passport.authenticate('jwt', {session: false}), (req, res) => {
	var journal = {
		content: req.body.content,
		select: req.body.select,
		title: req.body.title
	}
	Journal.findOneAndUpdate(
		{_id:req.body.journalId},
		{$set: journal},
		{new: true}).then(data=>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('更新公告错误')
	})
});


//adminToGetEneterprise
router.post("/adminToGetEneterprise", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(jwt.decode(req.body.token))
	if(jwt.decode(req.body.token).role=== '4'){
	enterprise.find({}).then(data=>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('获取公告错误')
	})}else{
		res.status(400).json('motherfuck')
	}
});

//getFeedBack
router.post("/getFeedBack", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(jwt.decode(req.body.token))
		feedback.find({}).then(data=>{
			res.json({
				code:20000,
				data
			})
		}).catch(err=>{
			console.log(err)
			res.status(400).json('获取公告错误')
		})
});












// router.post("/getEnterprises", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	var doctorId = jwt.decode(req.body.token).id
// 	doctorServiceTime.find({doctorId: doctorId}).then(docs => {
// 		var enterpriseIdArray = docs.map(doc=>{
// 			if (doc.enterpriseId !== "" && doc.sign !=='0')
// 				return mongoose.Types.ObjectId(doc.enterpriseId)
// 		})
// 		enterprise.find({_id:{$in:enterpriseIdArray}}).then(data=>{
// 			res.json({
// 				code:20000,
// 				data
// 			})
// 		})
// 	}).catch(err => {
// 		res.status(404).json(err)
// 	})
// });
//
// router.post("/doctorToGetPatients", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	Patients.find({enterpriseId:mongoose.Types.ObjectId(req.body.enterpriseId)}).then(docs=>{
// 		var data=docs
// 		res.json({
// 			code:20000,
// 			data
// 		})
// 	})
// });
//
//
// router.post("/getEnterprise", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	enterprise.findOne({_id:mongoose.Types.ObjectId(req.body.enterpriseId)}).then(docs=>{
// 		var data=docs
// 		res.json({
// 			code:20000,
// 			data
// 		})
// 	})
// });
//
//
// //getDoctorInfo
// router.post("/getDoctorInfo", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	Doctor.findOne({_id:mongoose.Types.ObjectId(req.body.doctorId)}).then(docs=>{
// 		var data=docs
// 		res.json({
// 			code:20000,
// 			data
// 		})
// 	})
// });
//
// //modifyDoctorInfo
// router.post("/modifyDoctorInfo", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	var doctorDatas = req.body.doctorData
// 	var doctor = {
// 		name:doctorDatas.name,
// 		tel:doctorDatas.tel,
// 		perfession:doctorDatas.perfession,
// 		address:doctorDatas.address,
// 		frequency:doctorDatas.frequency
// 	}
// 	// var sec = {
// 	// 	email:doctorDatas.email,
// 	// 	pwd:doctorDatas.pwd
// 	// }
// 	Doctor.findOneAndUpdate(
// 		{_id: doctorDatas._id},
// 		{$set: doctor},
// 		{new: true}
// 	).then(profile => {
// 		// user.findOneAndUpdate(
// 		// 	{_id: doctorDatas._id},
// 		// 	{$set: sec},
// 		// 	{new: true}
// 		// ).then(docs=>{
// 		// 	res.json({
// 		// 		code:20000
// 		// 	})
// 		res.json({
// 			code:20000
// 		})
// 	}).catch(err => {
// 		res.status(404).json(err)
// 	})
// });
//
//
//
// //getDoctorMessage
//
// router.post("/getDoctorMessage", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	doctorMessage.find({doctorId:req.body.doctorId,handle:'0'}).then(data=>{
// 		res.json({
// 			code:20000,
// 			data
// 		})
// 	})
// });
//
//
// //getAgree
//
// router.post("/getAgree", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	var messageAgree = {
// 		handle:'1',
// 		agree:'1',
// 	}
// 	var enterpriseid = {
// 		enterpriseId:req.body.enterpriseId
// 	}
// 	doctorMessage.findOneAndUpdate(
// 		{_id: req.body.messageId},
// 		{$set: messageAgree},
// 		{new: true}
// 	).then(doc=>{
// 		doctorServiceTime.findOneAndUpdate(
// 			{_id:req.body.doctorServiceTimeId},
// 			{$set: enterpriseid},
// 			{new: true}
// 		).then(doc=>{
// 			//console.log('同意预约')
// 			res.json({
// 				code:20000
// 			})
// 		})
//
// 	})
//
// });
//
// //setRefuse
// router.post("/setRefuse", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	var messagerefuse = {
// 		handle:'1',
// 		refuse:'1',
// 	}
// 	doctorMessage.findOneAndUpdate(
// 		{_id: req.body.messageId},
// 		{$set: messagerefuse},
// 		{new: true}
// 	).then(doc=>{
// 		res.json({
// 			code:20000
// 		})
// 	}).catch(err=>{
// 		res.status(404).json('error')
// 	})
// });
//
//
//
// router.post("/DoctorTogetDoctorAndServiceTime", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	doctorServiceTime.find({doctorId:req.body.doctorId}).then(docs=>{
// 		var data=docs
// 		res.json({
// 			code:20000,
// 			data
// 		})
// 	})
// });
//
//
//
//
// //DoctorToGetEnterprise
//
// router.post("/DoctorToGetEnterprise", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	enterprise.find({_id:{$in:req.body.enterpiseArray}}).then(docs=>{
// 		var data=docs
// 		//console.log(data)
// 		res.json({
// 			code:20000,
// 			data
// 		})
// 	})
// });
//
// //CreateSchedule
// router.post("/CreateSchedule", passport.authenticate('jwt', {session: false}), (req, res) => {
// 	//console.log(req.body)
// 	var doctorServiceTimes = new doctorServiceTime({
// 		startTime:req.body.startTime,
// 		endTime:req.body.endTime,
// 		doctorId:req.body.doctorId,
// 		enterpriseId:'',
// 		sign:'0'
// 	})
// 	doctorServiceTimes.save().then(doc=>{
// 		//console.log(doc)
// 		res.json({
// 			code:20000
// 		})
// 	}).catch(err=>{
// 		//consoel.log(err)
// 		res.status(404).json(err)
// 	})
//
// });


module.exports = router;

