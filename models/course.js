const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
//Course schema
var courseSchema=new mongoose.Schema({
    name:{
        type:String,
       
    },
    description:{
        type:String,
      
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    subjects:[{
        type:ObjectId,
        ref:"Subject"
    }],
    photo_status:{
        type:Boolean,
        default:false
    },
    publish:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
        default: 0
    },
    buylink:{
        type:String,
        default: 0
    }
},{timestamps:true});

module.exports=mongoose.model("Course",courseSchema);
