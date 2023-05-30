const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

//Subject schema
var subjectSchema=new mongoose.Schema({
    sname:{
        type:String,
        required:true
    },
    sphoto:{
        data:Buffer,
        contentType:String
    },
    sphoto_status:{
        type:Boolean,
        default:false
    },
    chapters:[
        {
        type:ObjectId,
        ref: "Chapter"
        }
    ],
    course_id:{
        type:ObjectId,
        ref: "Course"
    }
});

module.exports=mongoose.model("Subject",subjectSchema);