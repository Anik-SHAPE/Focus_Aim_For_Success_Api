const mongoose = require('mongoose');
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const {ObjectId}=mongoose.Schema;

var userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    photo:{
      data:Buffer,
      contentType:String
    },
    role:{           //default  value 
      type:Number,  //2 - Normal User
      default:2    //1 - Admin User
    },
    myCourse:[{
      type:ObjectId,
      ref: "MyCourse"
    }],
    wordCount:{
      type: Number,
      default: 0
    },           //0 - Creator User
    encry_password:{
      type:String,
      trim:true,
    },
    salt: String,
    Subscription:{
      type:ObjectId,
      ref: "Subscription" 
    },
},
{timestamps:true}
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);