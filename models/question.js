const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

//Question schema
var questionSchema=new mongoose.Schema({
    ques:{
        type:String,
    },
    chone:{
        type: String,
    },
    chtwo:{
        type:String,
    },
    chthree:{
        type:String,
    },
    chfour:{
        type:String
    },
    ans:{
        type:String,
    },
    qdescription:{
        type:String
    },
    qphoto:{
        data:Buffer,
        contentType:String
    },
    qphoto_status:{
        type:Boolean,
        default:false
    },
    chapter_id:{
        type:ObjectId,
        ref: "Subject"
    }
});

module.exports=mongoose.model("Question",questionSchema);