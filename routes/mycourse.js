// const express=require("express");
// const router=express.Router();

// const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
// const {getUserById}=require("../controllers/user");
// const {createPayment}=require("../controllers/payment");
// const {getCourseById}=require("../controllers/course");
// const {getMyCourseById,getMyCourse,addMyCourse,getAllMyCourseByUser, isPurchased}=require("../controllers/mycourse");

// //param
// router.param("userId",getUserById);
// router.param("courseId",getCourseById);
// router.param("mycousrseId",getMyCourseById);

// //routes

// router.get("/my-course/user/:userId/:mycourseId",isSignedIn,isAuthenticated,isPurchased,getMyCourse);
// router.get("/my-course-all/user/:userId",isSignedIn,isAuthenticated,getAllMyCourseByUser);

// //delete and add to mycourse

// router.post("/my-course-add/user/:userId/:courseId",isSignedIn,isAuthenticated,addMyCourse);


// //payment




// module.exports=router;


const express=require("express");
const router=express.Router();

const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
//const {createPayment}=require("../controllers/payment");
const {getCourseById}=require("../controllers/course");
const {getMyCourseById,getMyCourse,addMyCourse,getAllMyCourseByUser, isPurchased}=require("../controllers/mycourse");

//param
router.param("userId",getUserById);
router.param("courseId",getCourseById);
router.param("mycousrseId",getMyCourseById);

//routes

router.get("/my-course/user/:userId/:mycourseId",isSignedIn,isAuthenticated,isPurchased,getMyCourse);
router.get("/my-course-all/user/:userId",isSignedIn,isAuthenticated,getAllMyCourseByUser);

//delete and add to mycourse

router.post("/my-course-add/user/:userId/:courseId",isSignedIn,isAuthenticated,addMyCourse);
//router.post("/create-payment/:userId/:courseId",createPayment);

//payment




module.exports=router;