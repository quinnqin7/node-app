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


//getHistoryCase
router.post("/getHistoryCase", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(jwt.decode(req.body.token))
	var id = jwt.decode(req.body.token).id
	console.log(id)
	// historyCase.find({patientId:id}).then(data=>{
	// 	res.json({
	// 		code:20000,
	// 		data
	// 	})
	// }).catch(err=>{
	// 	console.log(err)
	// 	res.status(400).json('获取公告错误')
	// })
});




module.exports = router;
