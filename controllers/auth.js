const User=require("../models/user");
const { check,validationResult } = require('express-validator');
var expressjwt = require('express-jwt');
var jwt = require('jsonwebtoken');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


//Master Auth

//Mrthods
exports.SignUp=(req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
      const {  firstname, lastname, email, phone } = fields;
    
      if (!firstname || !email) {
        return res.status(400).json({
          error: "Please include  fields"
        });
      }
  
      let user = new User(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big! should be less then 3 MB"
          });
        }
        user.photo.data = fs.readFileSync(file.photo.path);
        user.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      user.save((err, user) => {
        if (err) {
         return res.status(400).json({
            error: "error in DB"
          });
        }
        user.photo=undefined;
        res.json(user);
      });
    });
 };


exports.SignIn=(req,res)=>{
     const {email,password}=req.body;
     const errors=validationResult(req);

     if(!errors.isEmpty()){
         return res.status(422).json({
             error: errors.array()[0].msg
         });
     }

     User.findOne({email},(err,user)=>{
         
         if(err || !user){
             return res.status(401).json({
                err: "User not found in DB"
             });
         }
         if(!user.autheticate(password)){
             
             return res.status(401).json({
                err:"Password not matched"
             });
           
         }

         const token=jwt.sign({ _id: user._id },process.env.SECRET);
         res.cookie("token",token,{ expire: new Date() + 9999 });
         const {_id,firstname,email,role}=user;
         return res.json({
             token,
             user:{_id,firstname,email,role}
         });
        

        
        

        
     });
     
}

exports.SignOut=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"Master user signout Sucessfully"
    });
    
      
};

//protected routes
exports.isSignedIn=expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middleware

exports.isAuthenticated=(req,res,next)=>{
    let checker= req.mProfile && req.auth && req.mProfile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACESS DENIED"
        });
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.mProfile.role===1){
        next();
    }else{
        return res.status(403).json({
            error: "YOU are not an admin"
        });
    }
    
}


exports.isAdminCreator=(req,res,next)=>{
    if(req.mProfile.role===0 || req.mProfile.role===1){
        next();
    }else{
        return res.status(403).json({
            error: "Acess denied"
        });
    }
}