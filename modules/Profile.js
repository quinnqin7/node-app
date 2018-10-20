const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema =new Schema({
    /*病人id*/
    patientId:{
        type:String,
        require:true
    },
    /*病人姓名*/
    patientName:{
        type:String,
        require:true
    },
    /*病人電話*/
    patientPhone:{
        type:Number,
        require:true
    },
    /*病情描述*/
    description:{
        type:String
    },
    /*病历详情页*/
    patientDetails:{
        type:String
    },
    /*创建时间*/
    date:{
        type:Date,
        default:Date.now
    },
    gender:{
        type:Number,
		require: true
    }
})

module.exports = Profile= mongoose.model("profile",ProfileSchema);