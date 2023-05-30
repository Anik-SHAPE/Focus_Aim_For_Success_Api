var express = require('express');
var router=express.Router();

//My Routes
var {SignUp,SignIn,SignOut}=require("../controllers/auth");
const { check,validationResult } = require('express-validator');

//Master Users
router.post("/signup",[
    check("firstname","First name should be atleast 3 charcter").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be atleast 6 charcter").isLength({min:6})
],SignUp);

router.post("/signin",[
    check("email","Email is required").isEmail(),
    check("password","Password id required").isLength({min:1})
],SignIn);

router.get("/signout",SignOut);


module.exports=router;