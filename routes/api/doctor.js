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
const moment = require('moment')

router.post("/getEnterprises", passport.authenticate('jwt', {session: false}), (req, res) => {
	var doctorId = jwt.decode(req.body.token).id
	doctorServiceTime.find({doctorId: doctorId}).then(docs => {
		var enterpriseIdArray = docs.map(doc=>{
			if (doc.enterpriseId !== "" && doc.sign !=='0')
			return mongoose.Types.ObjectId(doc.enterpriseId)
		})
		 enterprise.find({_id:{$in:enterpriseIdArray}}).then(data=>{
			 res.json({
				 		code:20000,
				 		data
				 	})
		 })
	}).catch(err => {
		res.status(404).json(err)
	})
});

router.post("/doctorToGetPatients", passport.authenticate('jwt', {session: false}), (req, res) => {
	Patients.find({enterpriseId:mongoose.Types.ObjectId(req.body.enterpriseId)}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});


router.post("/getEnterprise", passport.authenticate('jwt', {session: false}), (req, res) => {
	enterprise.findOne({_id:mongoose.Types.ObjectId(req.body.enterpriseId)}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});


//getDoctorInfo
router.post("/getDoctorInfo", passport.authenticate('jwt', {session: false}), (req, res) => {
	Doctor.findOne({_id:mongoose.Types.ObjectId(req.body.doctorId)}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});

//modifyDoctorInfo
router.post("/modifyDoctorInfo", passport.authenticate('jwt', {session: false}), (req, res) => {
	var doctorDatas = req.body.doctorData
	if(doctorDatas.header!==''){
	var doctor = {
		name:doctorDatas.name,
		tel:doctorDatas.tel,
		perfession:doctorDatas.perfession,
		address:doctorDatas.address,
		frequency:doctorDatas.frequency,
		header:doctorDatas.header
	}}
	else{
		var doctor = {
			name:doctorDatas.name,
			tel:doctorDatas.tel,
			perfession:doctorDatas.perfession,
			address:doctorDatas.address,
			frequency:doctorDatas.frequency,
		}
	}
	// var sec = {
	// 	email:doctorDatas.email,
	// 	pwd:doctorDatas.pwd
	// }
	Doctor.findOneAndUpdate(
		{_id: doctorDatas._id},
		{$set: doctor},
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



//getDoctorMessage

router.post("/getDoctorMessage", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorMessage.find({doctorId:req.body.doctorId,handle:'0'}).then(data=>{
		//console.log(data)
		res.json({
					code:20000,
					data
				})
	})
});


//getAgree

router.post("/getAgree", passport.authenticate('jwt', {session: false}), (req, res) => {
var messageAgree = {
	handle:'1',
	agree:'1',
}
var enterpriseid = {
	enterpriseId:req.body.enterpriseId
}
	doctorMessage.findOneAndUpdate(
		{_id: req.body.messageId},
		{$set: messageAgree},
		{new: true}
	).then(doc=>{
		doctorServiceTime.findOneAndUpdate(
			{_id:req.body.doctorServiceTimeId},
			{$set: enterpriseid},
			{new: true}
		).then(doc=>{
			//console.log('同意预约')
			res.json({
				code:20000
			})
		})

	})

});

//setRefuse
router.post("/setRefuse", passport.authenticate('jwt', {session: false}), (req, res) => {
	var messagerefuse = {
		handle:'1',
		refuse:'1',
	}
	doctorMessage.findOneAndUpdate(
		{_id: req.body.messageId},
		{$set: messagerefuse},
		{new: true}
	).then(doc=>{
		res.json({
			code:20000
		})
	}).catch(err=>{
		res.status(404).json('error')
	})
});



router.post("/DoctorTogetDoctorAndServiceTime", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorServiceTime.find({doctorId:req.body.doctorId}).then(docs=>{
		var data=docs
		res.json({
			code:20000,
			data
		})
	})
});




//DoctorToGetEnterprise

router.post("/DoctorToGetEnterprise", passport.authenticate('jwt', {session: false}), (req, res) => {
	enterprise.find({_id:{$in:req.body.enterpiseArray}}).then(docs=>{
		var data=docs
		//console.log(data)
		res.json({
			code:20000,
			data
		})
	})
});

//CreateSchedule
router.post("/CreateSchedule", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(req.body)
	var doctorServiceTimes = new doctorServiceTime({
		startTime:req.body.startTime,
		endTime:req.body.endTime,
		doctorId:req.body.doctorId,
		enterpriseId:'',
		sign:'0'
	})
	doctorServiceTimes.save().then(doc=>{
		//console.log(doc)
		res.json({
			code:20000
		})
	}).catch(err=>{
		//consoel.log(err)
		res.status(404).json(err)
	})

});



//fetchContentData

router.post("/fetchContentData", passport.authenticate('jwt', {session: false}), (req, res) => {
	var role = jwt.decode(req.body.token).role
	Journal.find({recipient:[role,'4']}).then(data=>{
		//console.log(doc)
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		//consoel.log(err)
		res.status(404).json(err)
	})

});


//getEnterpriseName
router.post("/getEnterpriseName", passport.authenticate('jwt', {session: false}), (req, res) => {
	enterprise.find({},{name:1}).then(data=>{
		//console.log(doc)
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		//consoel.log(err)
		res.status(404).json(err)
	})

});

//getDoctorServierTime
router.post("/getDoctorServierTime", passport.authenticate('jwt', {session: false}), (req, res) => {
	doctorServiceTime.find({doctorId:req.body.doctorId},{startTime:1,endTime:1}).then(data=>{
		//console.log(data)
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		//consoel.log(err)
		res.status(404).json(err)
	})

});



//getPatientNumberOfMonth

router.post("/getPatientNumberOfMonth", passport.authenticate('jwt', {session: false}), (req, res) => {
	historyCase.find({doctorId:req.body.doctorId},{time:1}).then(datas=>{
		//console.log(data)
		var data = [
			// 現在模擬
			{'日期': '1', '人/月': 100,},
			{'日期': '2', '人/月': 155,},
			{'日期': '3', '人/月': 255,},
			{'日期': '4', '人/月': 355,},
			{'日期': '5', '人/月': 455,},
			{'日期': '6', '人/月': 355,},
			{'日期': '7', '人/月': 543,},
			{'日期': '8', '人/月': 664,},
			{'日期': '9', '人/月': 765,},
			{'日期': '10', '人/月': 876,},
			{'日期': '11', '人/月': 134,},
			{'日期': '12', '人/月': 21,}
		]

		datas.map(item=>{
			data[moment(item.time).format("MM")-1]["人/月"]++
		})
		//console.log(char)
		// moment(date).format("YYYY-MM-DD");
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		//consoel.log(err)
		res.status(404).json(err)
	})

});

//getpatientRateToDoctor
router.post("/getpatientRateToDoctor", passport.authenticate('jwt', {session: false}), (req, res) => {
	historyCase.find({doctorId:req.body.doctorId},{_id:0,rate:1}).then(datas=>{
		//console.log(datas)
		var data = [
			{'Satisfaction': '1', 'assess': 123},
			{'Satisfaction': '2', 'assess': 434},
			{'Satisfaction': '3', 'assess': 54},
			{'Satisfaction': '4', 'assess': 76},
			{'Satisfaction': '5', 'assess': 99},
		]
		//datas.filter(jfk=>jfk)
		datas.map(item=>{
			if(item.rate!==0)
			data[item.rate-1].assess++
		})
		//console.log(char)
		// moment(date).format("YYYY-MM-DD");
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(404).json(err)
	})

});






module.exports = router;

