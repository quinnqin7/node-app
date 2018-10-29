//@profile
const express = require("express");
const router=express.Router();
const passport=require("passport");
var Profile = require('../../modules/user')
const Patients =require("../../modules/patients")
const jwt = require('jsonwebtoken');


router.post("/patients",passport.authenticate('jwt',{session:false}),(req,res)=>{
	var enterPriseId = jwt.decode(req.body.token).id
    Patients.find({enterPriseId}).then(patientlist => {
        var data = patientlist
		res.json({
			code:20000,
			data
		})
    }).catch(err=>res.status(404).json(err));

});

router.get("/patients/:id",passport.authenticate('jwt',{session:false}),(req,res) => {
	console.log('jfkldsjfklajsfkljlkfjaskjk')
	console.log(req.params.id)
	// Patients.findOne({_id:req.params.id})
	// 	.then(patient=>{
	// 		if(!patient){
	// 			return res.status(404).json("没有任何内容");
	// 		}
	// 		var data = patient
	// 		res.json({
    //             code:20000,
	// 			data
    //         });
	// 	})
	// 	.catch(err=>res.status(404).json(err));
});


// $route GET api/profiles
// @desc 获取所有信息
//@access private
router.get("/",passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.find()
        .then(profile=>{
            if(!profile){
                return res.status(404).json("没有任何内容");
            }
            res.json(profile);
        })
        .catch(err=>res.status(404).json(err));
})

// $route GET api/profiles/:id
// @desc 获取单个信息
// @access private
// router.get("/:id",passport.authenticate('jwt',{session:false}),(req,res) => {
//     Profile.findOne({_id:req.params.id})
//         .then(profile=>{
//             if(!profile){
//                 return res.status(404).json("没有任何内容");
//             }
//             res.json(profile);
//         })
//         .catch(err=>res.status(404).json(err));
// });

// $route POST api/profiles/edit
// @desc 编辑信息接口
//@access private
router.post("/edit/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields={};
    /*判断写入的信息是否能添加*/
    if(req.body.patientId) profileFields.patientId = req.body.patientId;
    if(req.body.patientName) profileFields.patientName = req.body.patientName;
    if(req.body.patientPhone) profileFields.patientPhone = req.body.patientPhone;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.body.patientDetails) profileFields.patientDetails = req.body.patientDetails;
    if(req.body.gender) profileFields.gender = req.body.gender;
    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile => res.json(profile))
});


// $route POST api/profiles/delete/:id
// @desc 删除信息接口
//@access private
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOneAndRemove({_id:req.params.id})
        .then(profile =>{
        profile.save().then(profile =>res.json(profile));
        })
        .catch(err=>res.status(404).json("删除失败！"));
});

module.exports = router;
