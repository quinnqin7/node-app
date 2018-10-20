//@profile
const express = require("express");
const router=express.Router();
const passport=require("passport");

const Profile =require("../../modules/Profile")

// $route GET api/profiles/test
//todo @desc 返回的请求的json数据
//@access public
router.get("/test",(req,res) => {
   res.json({msg:"Profile works"})
})

// $route POST api/profiles/add
//todo @desc 创建信息接口
//@access private
router.post("/add",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields={};
    /*判断写入的信息是否能添加*/
    if(req.body.patientId) profileFields.patientId = req.body.patientId;
    if(req.body.patientName) profileFields.patientName = req.body.patientName;
    if(req.body.patientPhone) profileFields.patientPhone = req.body.patientPhone;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.body.patientDetails) profileFields.patientDetails = req.body.patientDetails;
    
    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    })
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
router.get("/:id",passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOne({_id:req.params.id})
        .then(profile=>{
            if(!profile){
                return res.status(404).json("没有任何内容");
            }
            res.json(profile);
        })
        .catch(err=>res.status(404).json(err));
});

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