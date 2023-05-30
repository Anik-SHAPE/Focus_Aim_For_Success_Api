const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

//Question schema
var chapterSchema=new mongoose.Schema({
    cname:{
        type: String,
        required:true
    },
    introduction:{
        type:String,
        require:true
    },
    unlock:{
        type:Boolean,
        default:false
    },
    questions:[
        {
        type:ObjectId,
        ref: "Question"
        }
    ],
    subject_id:{
        type:ObjectId,
        ref: "Subject"
    },
    videoLinkOne: {
        type:String,
    },
    videoLinkTwo: {
        type:String,
    },
    videoLinkThree: {
        type:String,
    },
    videoLinkFour: {
        type:String,
    },
    videoLinkFive: {
        type:String,
    }
});

module.exports=mongoose.model("Chapter",chapterSchema);