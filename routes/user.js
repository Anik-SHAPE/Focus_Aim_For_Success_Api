const express=require("express");
const router=express.Router();

//MY Routes
const {getUserById,getUser,getAllUsers,updateUser,delUser,getAllContentWriter,getAllAdmin,getAllNormalUser, photo}=require("../controllers/user");
const {SignIn,isSignedIn,isAuthenticated,isAdmin, isCreator, SignUp}=require("../controllers/auth");


//Param
router.param("userId",getUserById);

//Create user
router.post("/create/user/:userId",isSignedIn,isAuthenticated,isAdmin,SignUp);

//get and update user
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/update/user/:userId",isSignedIn,isAuthenticated,updateUser);

//get all user
router.get("/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllUsers);

//get all user By sort....
router.get("/content-writer/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllContentWriter);
router.get("/admin/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllAdmin);
router.get("/normal-user/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllNormalUser);
router.get("/user-profile/photo/:userId",photo);


//delete user
router.delete("/delete/user/:userId",isSignedIn,isAuthenticated,isAdmin,delUser);

module.exports=router;