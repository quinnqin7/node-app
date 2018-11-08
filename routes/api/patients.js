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
const assessCase = require('../../modules/assess')

//getHistoryCase
router.post("/getHistoryCase", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(jwt.decode(req.body.token))
	var id = jwt.decode(req.body.token).id
	console.log(id)
	historyCase.find({patientId:id}).then(data=>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('获取病例错误')
	})
});


//assessCase
router.post("/assessCase", passport.authenticate('jwt', {session: false}), (req, res) => {
	//console.log(jwt.decode(req.body.token))
	console.log(req.body.caseId)
	var data = {
		accessContent:req.body.content,
		rate:req.body.rate,
		accessDate:new Date()
	}
	historyCase.findOneAndUpdate(
		{_id:req.body.caseId},
		{$set:data},
		{new:true}
	).then(doc =>{
		res.json({
			code:20000,
			data:{
			success:"评价成功"}
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('评价过了')
	})
});

//getOneRate
router.post("/getOneRate", passport.authenticate('jwt', {session: false}), (req, res) => {
	assessCase.findOne({_id:req.body.caseId}).then(data =>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('提取出错')
	})
});

//getAllRate
router.post("/getAllRate", passport.authenticate('jwt', {session: false}), (req, res) => {
	// console.log('fjdksfkasldaks')
	assessCase.find({}).then(data =>{
		res.json({
			code:20000,
			data
		})
	}).catch(err=>{
		console.log(err)
		res.status(400).json('提取出错')
	})
});















module.exports = router;
