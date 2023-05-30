const express=require("express");
const router=express.Router();

//MY Routes
const {getUserById,getUser,getAllUsers,updateUser,delUser}=require("../controllers/user");
const {SignUp,isSignedIn,isAuthenticated,isAdmin, isAdminCreator}=require("../controllers/auth");
const {
  getCourseById,
  createCourse,
  updateCourse,
  getAllCourse,
  getCourse,
  deleteCourse,
  photo,
  getSubjectById,
  getSubject,
  subjectPhoto,
  getAllSubjectByCourse,
  updateSubject,
  createPushSubjectToCourse,
  deleteSubject,getQuestionById,
  getQuestion,questionPhoto,createPushQuestionToChapter,
  updateQuestion,deleteQuestion, getAllQuestionBySubject,getChapterById,
  getChapter,getAllChapterBySubject,deleteChapter,updateChapter, createPushChapterToSubject}=require("../controllers/course");
//Param
router.param("userId",getUserById);
router.param("courseId",getCourseById);
router.param("subjectId",getSubjectById);
router.param("chapterId",getChapterById);
router.param("questionId",getQuestionById);

//create course
router.post(
    "/course-create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCourse
  );
  
  // read course
  router.get("/course-get/:courseId",getCourse);
  router.get("/course/photo/:courseId",photo);
  
  //delete course
  router.delete(
    "/course-delete/:courseId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCourse
  );
  
  //update course
  router.put(
    "/course-update/:courseId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCourse
  );
  
  //get all course
  router.get("/courses",getAllCourse);


  //Method routes

  //Subject Routes

  //create subject
  router.post(
    "/course/subject-create/:userId/:courseId",
    isSignedIn,
    isAuthenticated,
    isAdminCreator,
    createPushSubjectToCourse
    );
    
  //read subject

  router.get("/course/subject-get/:userId/:subjectId",isSignedIn,isAuthenticated,getSubject);
  router.get("/subject/photo/:subjectId",subjectPhoto);
  
//update subject
  router.put(
    "/course/subject-update/:userId/:subjectId",
    isSignedIn,
    isAuthenticated,
    isAdminCreator,
    updateSubject
  );

//delete subject
  router.delete(
    "/course/subject-delete/:userId/:courseId/:subjectId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteSubject
  );

//getAll Subject
  router.get("/course/subjects/:userId/:courseId",isSignedIn,isAuthenticated,getAllSubjectByCourse);


//Chapter Routes

  //create chapter
  router.post(
    "/subject/chapter-add/:userId/:subjectId",
    isSignedIn,
    isAuthenticated,
    isAdminCreator,
    createPushChapterToSubject
    );
    
  //read chapter

  router.get("/subject/chapter-get/:userId/:chapterId",isSignedIn,isAuthenticated,getChapter);
  

  //update chapter
  router.put(
    "/subject/chapter-update/:userId/:chapterId",
    isSignedIn,
    isAuthenticated,
    isAdminCreator,
    updateChapter
  );
//delete chapter
  router.delete(
    "/subject/chapter-del/:userId/:subjectId/:chapterId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteChapter
  );


  //getAll chapters
  router.get("/subject/chapters/:userId/:subjectId",isSignedIn,isAuthenticated,getAllChapterBySubject);




  //Question Routes


  //create question
  router.post(
    "/subject/question-add/:userId/:chapterId",
    isSignedIn,
    isAuthenticated,
    isAdminCreator,
    createPushQuestionToChapter
    );
    
  //read question

  router.get("/chapter/question-get/:userId/:questionId",isSignedIn,isAuthenticated,getQuestion);
  router.get("/question/photo/:questionId",questionPhoto);
  

  //update question
  router.put(
    "/chapter/question-update/:userId/:questionId",
    isSignedIn,
    isAuthenticated,
    isAdminCreator,
    updateQuestion
  );

  //delete question
  router.delete(
    "/chapter/question-del/:userId/:chapterId/:questionId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteQuestion
  );


  //getAll question
  router.get("/chapter/questions/:userId/:chapterId",isSignedIn,isAuthenticated,getAllQuestionBySubject);


  

module.exports=router;