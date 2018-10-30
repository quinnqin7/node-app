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

router.post("/getEnterprises", passport.authenticate('jwt', {session: false}), (req, res) => {
	var doctorId = jwt.decode(req.body.token).id
	//var enterproseToService = []
	doctorServiceTime.find({doctorId: doctorId}).then(docs => {
		//console.log(docs)
		var enterpriseIdArray = docs.map(doc=>{
			if (doc.enterpriseId !== "")
			return mongoose.Types.ObjectId(doc.enterpriseId)

		})
		 console.log(enterpriseIdArray)
		 enterprise.find({_id:{$in:enterpriseIdArray}}).then(data=>{
			 res.json({
				 		code:20000,
				 		data
				 	})
		 })
		// var data = docs.map(doc => {
		// 	console.log(doc.enterpriseId)
		// 	if (doc.enterpriseId !== "") {
		// 		var enterpriseId = mongoose.Types.ObjectId(doc.enterpriseId)
		// 		enterprise.findOne({_id: enterpriseId}).then(doc => {
		// 			console.log(doc)
		// 			return doc.toObject()
		// 			// enterproseToService.push(doc)
		// 		})
		// 	}
		// })
		//var data = enterproseToService
		// res.json({
		// 	code:20000,
		// 	data
		//})
	}).catch(err => {
		res.status(404).json(err)
	})



	//console.log("doctorId: " + doctorId)
	// Patients.find({enterpriseId}).then(patientlist => {
	// 	var data = patientlist
	// 	res.json({
	// 		code:20000,
	// 		data
	// 	})
	// }).catch(err=>res.status(404).json(err));

});
module.exports = router;
