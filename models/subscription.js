const mongoose=require("mongoose");

var subsScription=new mongoose.Schema({

    //TODO: make subscription
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    subsplan:{
        type:Boolean,
        default: false
    },
    subscriptionDays:{ 
        type:Number,
        default:0
      },
    daysPresent: [Date],
    user: {
      type: ObjectId,
      ref: "User"
    }

  

},{timestamps:true});

module.exports=mongoose.model("Subscription",categorySchema);