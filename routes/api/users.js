//@login & register
const express = require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport=require("passport");
const api = require("../../web/src/api/path")
const User =require("../../modules/user")
const Doctor = require("../../modules/doctor")
const enterprise = require("../../modules/enterprise")


router.post("/register",(req,res) =>{
	let parse  = req.body
    User.findOne({email:parse.email})
    .then((user) => {
        if(user){
            return res.status(400).json("郵箱已被註冊!")
        }else{
            const newUser= new User({
                email:parse.email,
                pwd:parse.pwd,
                role:parse.role
            });
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.pwd, salt, function(err, hash) {
                    if(err) throw err;
                    newUser.pwd = hash;
                    newUser.save()
                        .then(user =>
							{
								if(user.role === '1'){
									new Doctor({_id:user.id}).save()
								}
								else if(user.role === '2')
								{
									new enterprise({_id:user.id}).save()
								}
								const rule={
								id: user.id,
								role:user.role
							};
								jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
									if(err) throw err;
									res.json({
										code:20000,
										data:{
											"token":token
										}
									});
								})
							}
						)
                        .catch(err => console.log(err));
                });
            });


        }
    })
})

router.post("/login",(req,res) =>{
	let parse  = req.body
    const email =parse.email;
    const pwd = parse.pwd;
    User.findOne({email})
        .then(user =>{
            bcrypt.compare(pwd, user.pwd)
                  .then(isMatch => {
                      if(isMatch){
                          const rule={
                              id: user.id,
							  role:user.role
                            };
                          jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                            if(err) throw err;
                            res.json({
                                code:20000,
                                data:{
                                    "token":token
                                }
                            });
                        })
                      }
                      else{
                          return res.status(400).json("密碼錯誤")
                      }
                  })
        });
    })



router.post("/logout",(req,res) =>{
	res.json({
		code:20000
	})
})




router.post(
    "/getInfo",
    passport.authenticate("jwt",{session:false}),
    (req,res)=>{
		var id = jwt.decode(req.body.token).id;
		var role = jwt.decode(req.body.token).role;
		if(role === "1")
		{
			Doctor.findOne({_id:id}).then(user =>{
				var data = user.toObject()
				var c = []
				c.push(role)
				Object.assign(data,{roles:c})
					res.json({
						code:20000,
						data
					})
				}
			)
		}
		if(role === "2")
		{
			enterprise.findOne({_id:id}).then(user =>{
				var data = user.toObject()
				var c = []
				c.push(role)
				Object.assign(data,{roles:c})
				res.json({
					code:20000,
					data
				})
				}
			)
		}


})

module.exports = router;
