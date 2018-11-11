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

//sendfeedback
router.post("/sendfeedback", passport.authenticate('jwt', {session: false}), (req, res) => {
	var haha = new feedback({
		content:req.body.content,
		date:new Date()
	})
	haha.save().then(()=>{
		res.json({
			code:20000
		})
	}).catch((err)=>{
		res.status(404).json(err)
	})
	//console.log(req.body)
	// if(jwt.decode(req.body.token).role === '4'){
	// 	var Journalontent = new Journal({
	// 		date:new Date(),
	// 		content:req.body.content,
	// 		recipient:req.body.recipient,
	// 		title:req.body.title,
	// 	})
	// 	Journalontent.save().then(doc=>{
	// 		//console.log(doc)
	// 		res.json({
	// 			code:20000
	// 		})
	// 	}).catch(err=>{
	// 		//consoel.log(err)
	// 		res.status(404).json(err)
	// 	})
	// }else{
	// 	res.status(404).json(err)
	// }
});


router.post("/getRoleCount", (req, res) => {
	Patients.count({}).then(PatientsCount=>{
		Doctor.count({}).then(DoctorCount=>{
			enterprise.count({}).then(enterpriseCount=>{
				historyCase.find({},{rate:1}).then(allRate=>{
					var rateCount=0;
					var haveRate = 0
					allRate.map(rate=>{
						if(rate.rate!==undefined) {
							rateCount += parseInt(rate.rate)
							haveRate++
						}
					})
					var avgRate = rateCount/haveRate
					var data = {
						PatientsCount:PatientsCount,
						DoctorCount:DoctorCount,
						enterpriseCount:enterpriseCount,
						avgRate:avgRate
					}
					res.json({
						code:20000,
						data
					})
				})
			})
		})

	})

});




module.exports = router;
