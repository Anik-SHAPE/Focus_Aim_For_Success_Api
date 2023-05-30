//TODO:Course controller METHOD
const Course=require("../models/course");
const Subject=require("../models/subject");
const Question=require("../models/question");
const Chapter=require("../models/chapter");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//Course Methods
exports.getCourseById = (req, res, next, id) => {
    Course.findById(id)
      .exec((err, course) => {
        if (err) {
          return res.status(400).json({
            error: "Course not found"
          });
        }
        req.course = course;
        next();
      });
  };
  
exports.createCourse = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
      const { name } = fields;
  
      if (!name) {
        return res.status(400).json({
          error: "Please include name and description fields"
        });
      }
  
      let course = new Course(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big! should be less then 3 MB"
          });
        }
        course.photo.data = fs.readFileSync(file.photo.path);
        course.photo.contentType = file.photo.type;
      }
      // console.log(course);
  
      //save to the DB
      course.save((err, course) => {
        if (err) {
          res.status(400).json({
            error: "Saving course in DB failed"
          });
        }
        res.json(course);
      });
    });
  };
  
exports.getCourse = (req, res) => {
    req.course.photo = undefined;
    return res.json(req.course);
  };
  
  //middleware
exports.photo = (req, res, next) => {
    if (req.course.photo.data) {
      res.set("Content-Type", req.course.photo.contentType);
      return res.send(req.course.photo.data);
    }
    next();
  };
  
  // delete controllers
exports.deleteCourse = (req, res) => {
    let course = req.course;
    course.remove((err, deletedCourse) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the Course"
        });
      }
      res.json({
        message: "Deletion was a success",
        deletedCourse
      });

    })


     
        //subject code statement....

  //   var chapDoc=[];
  //   var subjectDoc=[];
  //   var questionDoc=[];

  //  subjectDoc=deletedCourse.subjects;
   
  //  Subject.find({_id:subjectDoc}).exec((err,subdoc)=>{
  //   subdoc.chapters.forEach(function(Cid) {
  //     chapDoc.push(Cid);
  //   })
  // });

  //    Chapter.find({_id:chapDoc}).exec((err,chap)=>{
  //     chap.questions.forEach(function(Qid){
  //       questionDoc.push(Qid);
  //     });
  //   });

  //   Subject.remove({_id:subjectDoc},(err,subject)=>{

  //   });

  //   Chapter.remove({_id:chapDoc},(err,subject)=>{
      
  //   });

  //   Question.remove({_id:questionDoc},(err,subject)=>{
      
  //   });










  //   });
  };
  
  // delete controllers
  exports.updateCourse = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let course = req.course;
      course = _.extend(course, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        course.photo.data = fs.readFileSync(file.photo.path);
        course.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      course.save((err, course) => {
        if (err) {
          res.status(4000).json({
            error: "Updation of Course failed"
          });
        }
        res.json(course);
      });
    });
  };
  
  //product listing
  
  exports.getAllCourse = (req, res) => {
    Course.find()
      .select("-photo")
      .exec((err, courses) => {
        if (err) {
          return res.status(400).json({
            error: "NO product FOUND"
          });
        }
      
        res.json(courses);
    
      }
    );
  };


  //////////subject/////////////////

 //METHOD

  //getSubjectById

  exports.getSubjectById = (req, res, next, id) => {
    Subject.findById(id)
      .exec((err, subject) => {
        if (err) {
          return res.status(400).json({
            error: "Subject not found"
          });
        }
        req.subject = subject;
        next();
      });
  };

   exports.getSubject=(req,res)=>{
    req.subject.sphoto = undefined;
    return res.json(req.subject);
   };

    exports.subjectPhoto=(req,res)=>{
      if (req.subject.sphoto.data) {
        res.set("Content-Type", req.subject.sphoto.contentType);
        return res.send(req.subject.sphoto.data);
      }
      next();
    };

    exports.createPushSubjectToCourse = (req, res) => {
      let course=req.course;
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
    
      form.parse(req, (err, fields, file) => {
        if (err) {
          return res.status(400).json({
            error: "problem with image"
          });
        }
        //destructure the fields
        const { sname } = fields;
    
        if (!sname) {
          return res.status(400).json({
            error: "Please include name and description fields"
          });
        }
    
        let  subject= new Subject(fields);
    
        //handle file here
        if (file.sphoto) {
          if (file.sphoto.size > 3000000) {
            return res.status(400).json({
              error: "File size too big! should be less then 3 MB"
            });
          }
          subject.sphoto.data = fs.readFileSync(file.sphoto.path);
          subject.sphoto.contentType = file.sphoto.type;
        }
        // console.log(course);
    
        //save to the DB
        subject.course_id=course._id;
        subject.save((err,subject)=>{
          if(err){
            res.status(400).json({
              error: "Saving subject to subject in DB failed"
            });
          }
          course.subjects.push(subject._id);
          course.save((err,course)=>{
            if(err){
              res.status(400).json({
                error: "Saving subject id in course  DB failed"
              });
            }
          });
          res.json(subject);
        });

  
      });
    };
    exports.getAllSubjectByCourse=(req,res)=>{
      let course=req.course;
      Subject.find({_id:course.subjects})
      .select("-sphoto")
      .exec((err,subjects)=>{
        if(err){
          return res.status(400).json({
            error: "NO Subject FOUND"
          });
        }
        res.json(subjects);
      });
    
     
        
    };

    exports.deleteSubject=(req,res)=>{
      let subject = req.subject;
      let course=req.course;
      subject.remove((err, deletedSubject) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to delete the Subject"
          });
        }
        res.json({
          message: "Deletion was a success",
          deletedSubject
        });
        var index=course.subjects.indexOf(deletedSubject._id);
        if (index > -1) {
          course.subjects.splice(index, 1);
       }
        course.save((err,course)=>{
          if (err) {
            return res.status(400).json({
              error: "Failed to delete the Subject"
            });
          }
        });
      });
    };

    exports.updateSubject = (req, res) => {
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
    
      form.parse(req, (err, fields, file) => {
        if (err) {
          return res.status(400).json({
            error: "problem with image"
          });
        }
    
        //updation code
        let subject = req.subject;
        subject = _.extend(subject, fields);
    
        //handle file here
        if (file.sphoto) {
          if (file.sphoto.size > 3000000) {
            return res.status(400).json({
              error: "File size too big!"
            });
          }
          subject.sphoto.data = fs.readFileSync(file.sphoto.path);
          subject.sphoto.contentType = file.sphoto.type;
        }
        // console.log(product);
    
        //save to the DB
        subject.save((err, subject) => {
          if (err) {
            res.status(4000).json({
              error: "Updation of subject failed"
            });
          }
          res.json(subject);
        });
      });
    };

//Chaptar method

exports.getChapterById = (req, res, next, id) => {
   Chapter.findById(id)
    .exec((err, chapter) => {
      if (err) {
        return res.status(400).json({
          error: "chapter not found"
        });
      }
      req.chapter = chapter;
      next();
    });
};

exports.getChapter=(req,res)=>{
  return res.json(req.chapter);
 };

exports.createPushChapterToSubject = (req, res) => {
    let subject=req.subject;
   
    
  
      let  chapter= new Chapter(req.body);
  
      // console.log(chapter);
  
      //save to the DB
      chapter.subject_id=subject._id;
      chapter.save((err,chapter)=>{
        if(err){
          res.status(400).json({
            error: "Saving chapter  DB failed"
          });
        }
        subject.chapters.push(chapter)
        subject.save((err,subject)=>{
          if(err){
            res.status(400).json({
              error: "Saving chapter id in Subject  DB failed"
            });
          }
        });
        res.json(chapter);
      });


    
  };
exports.getAllChapterBySubject=(req,res)=>{
    let subject=req.subject;
    Chapter.find({_id:subject.chapters})
    .exec((err,chapter)=>{
      if(err){
        return res.status(400).json({
          error: "NO chapter FOUND"
        });
      }
      res.json(chapter);
    });
  };

  exports.deleteChapter=(req,res)=>{
    let chapter = req.chapter;
    let subject=req.subject;
    chapter.remove((err, deletedChapter) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the Chapter"
        });
      }
      res.json({
        message: "Deletion was a success",
        deletedChapter
      });
      var index=subject.chapters.indexOf(deletedChapter._id);
      if (index > -1) {
        subject.chapters.splice(index, 1);
     }
      subject.save((err,subject)=>{
        if (err) {
          return res.status(400).json({
            error: "Failed to delete the chapter"
          });
        }
      });
    });
  };

  exports.updateChapter = (req, res) => {
   
  /*
      //updation code
      let chapter = req.chapter;
    
  
      //save to the DB
      chapter.save((err, chapter) => {
        if (err) {
          res.status(4000).json({
            error: "Updation of Chapter failed"
          });
        }
        res.json(chapter);
      });
    });*/

    Chapter.findOneAndUpdate(
      {_id:req.chapter._id},
      {$set: req.body},
      {new: true, useFindAndModify: false},
      (err,chapter)=>{
       if(err){
        res.status(400).json({
          err: "ERROR OCCURD UPDATING CHAPTER DB"
        });
       }
       res.json(chapter);
      }
    );
  };





//Question Methods

  exports.getQuestionById = (req, res, next, id) => {
    Question.findById(id)
      .exec((err, question) => {
        if (err) {
          return res.status(400).json({
            error: "question not found"
          });
        }
        req.question =question;
        next();
      });
  };

  exports.getQuestion=(req,res)=>{
    req.question.qphoto = undefined;
    return res.json(req.question);
   };

  exports.questionPhoto=(req,res)=>{
      if (req.question.qphoto.data) {
        res.set("Content-Type", req.question.qphoto.contentType);
        return res.send(req.question.qphoto.data);
      }
      next();
    };

  exports.createPushQuestionToChapter = (req, res) => {
      let chapter=req.chapter;
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
    
      form.parse(req, (err, fields, file) => {
        if (err) {
          return res.status(400).json({
            error: "problem with image"
          });
        }
        //destructure the fields
        const { ques, ans, qdescription,qphoto_status } = fields;
    
        if (!ques || !ans || !qdescription) {
          return res.status(400).json({
            error: "Please include name,ans and description fields"
          });
        }
    
        let  question= new Question(fields);
    
        //handle file here
        if (file.qphoto) {
          if (file.qphoto.size > 3000000) {
            return res.status(400).json({
              error: "File size too big! should be less then 3 MB"
            });
          }
          question.qphoto.data = fs.readFileSync(file.qphoto.path);
          question.qphoto.contentType = file.qphoto.type;
        }
        // console.log(course);
    
        //save to the DB
        question.chapter_id=chapter._id;
        question.save((err,question)=>{
          if(err){
            res.status(400).json({
              error: "Saving question  DB failed"
            });
          }
          chapter.questions.push(question)
          chapter.save((err,chapter)=>{
            if(err){
              res.status(400).json({
                error: "Saving question id in chapter  DB failed"
              });
            }
          });
          res.json(question);
        });  
      });
    };
  exports.getAllQuestionBySubject=(req,res)=>{
      let chapter=req.chapter;
      Question.find({_id:chapter.questions})
      .select("-qphoto")
      .exec((err,questions)=>{
        if(err){
          return res.status(400).json({
            error: "NO question FOUND"
          });
        }
        res.json(questions);
      });
     
        
    };

    exports.deleteQuestion=(req,res)=>{
      let question = req.question;
      let chapter=req.chapter;
      question.remove((err, deletedQuestion) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to delete the Question"
          });
        }
        res.json({
          message: "Deletion was a success",
          deletedQuestion
        });
        var index=chapter.questions.indexOf(deletedQuestion._id);
        if (index > -1) {
          chapter.questions.splice(index, 1);
       }
        chapter.save((err,chapter)=>{
          if (err) {
            return res.status(400).json({
              error: "Failed to delete the question"
            });
          }
        });
      });
    };

    exports.updateQuestion = (req, res) => {
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
    
      form.parse(req, (err, fields, file) => {
        if (err) {
          return res.status(400).json({
            error: "problem with image"
          });
        }
    
        //updation code
        let question = req.question;
        question = _.extend(question, fields);
    
        //handle file here
        if (file.qphoto) {
          if (file.qphoto.size > 3000000) {
            return res.status(400).json({
              error: "File size too big!"
            });
          }
          question.qphoto.data = fs.readFileSync(file.qphoto.path);
          question.qphoto.contentType = file.qphoto.type;
        }
        // console.log(product);
    
        //save to the DB
        question.save((err, question) => {
          if (err) {
            res.status(4000).json({
              error: "Updation of question failed"
            });
          }
          res.json(question);
        });
      });
    };


