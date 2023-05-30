const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

var mycourseSchema=new mongoose.Schema({
    courseID:{
        type:ObjectId,
        ref: "Course"
    },
    purchased:{
        type:Boolean,
        default:false
    },
    purchasedate:{
        type:Date,
        default:Date.now
    },
    validationDay:{
        type:Number,
        default:30
    }
});

module.exports=mongoose.model("MyCourse",mycourseSchema);