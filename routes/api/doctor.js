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





router.post("/getEnterprises", passport.authenticate('jwt', {session: false}), (req, res) => {
	var doctorId = jwt.decode(req.body.token).id
	doctorServiceTime.find({doctorId: doctorId}).then(docs => {
		var enterpriseIdArray = docs.map(doc=>{
			if (doc.enterpriseId !== "")
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
	var doctor = {
		name:doctorDatas.name,
		tel:doctorDatas.tel,
		perfession:doctorDatas.perfession,
		address:doctorDatas.address,
		frequency:doctorDatas.frequency
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

module.exports = router;

