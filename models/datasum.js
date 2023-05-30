const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


var datasumSchema=new mongoose.Schema({

    totalWriter:{
        type: Number,
        default: 0
    },

    totalAdmin:{
        type: Number,
        default: 0
    },

    totalUser:{
        type: Number,
        default: 0
    },

    totalMoney:{
        type: Number,
        default: 0
    },

    totalCourse:{
        type: Number,
        default: 0
    },

    user:{
        type: ObjectId,
        ref: "User"    
    }


});

module.exports=mongoose.model("DataSum", datasumSchema);