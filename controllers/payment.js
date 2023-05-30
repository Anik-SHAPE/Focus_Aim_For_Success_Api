const Course=require("../models/course");
const User=require("../models/user");
const MyCourse=require("../models/mycourse");
var Insta = require('instamojo-nodejs');
var url= require("uri");
var session = require('express-session');


exports.createPayment=(req,res,next)=>{
    let course=new Course(req.body);
    let user=new User(req.body);
    let mycourse=new MyCourse(req.body);

    Insta.setKeys(API_KEY, AUTH_KEY);
    var data = new Insta.PaymentData();
    data.purpose = course.name;            // REQUIRED
    data.amount = course.amount;                  // REQUIRED
    data.setRedirectUrl(REDIRECT_URL);

    if(amount==0){
      next();
    }
    
    if(amount > 0 && amount != 0){

    Insta.createPayment(data, function(error, response) {
     if (error) {
    console.log("payment is unsucess full");
    } else {
      next();
     }
   });

  }

};