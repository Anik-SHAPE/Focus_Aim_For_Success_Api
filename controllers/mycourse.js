// const MyCourse=require("../models/mycourse");
// const Course=require("../models/course");

// exports.getMyCourseById=(req,res,next,id)=>{
//     MyCourse.findById(id).exec((err,mycourse)=>{
//         if(err){
//             return res.status(400).json({error: "Error in DB"});
//         }
//         req.mycourse=mycourse;
//         res.json(mycourse);
//         next();
//     });
// };

// exports.getMyCourse=(req,res)=>{
   
//     const mycourse=req.mycourse;
//     res.json(mycourse);
   
// };

// exports.getAllMyCourseByUser=(req,res)=>{
//     const mProfile=req.mProfile;
//     MyCourse.find({_id:mProfile.myCourse,purchased: true}).exec((err,mycourses)=>{
//         if(err){
//             return res.status(400).json({
//                 error: "Error in DB"
//             });
//         }
//         res.json(mycourses);
//     });
// };


// exports.addMyCourse=(req,res)=>{


//     let mycourse=new MyCourse(req.body);
//     mycourse.courseID=req.course._id;
//     mycourse.save((err,mc)=>{
//         if(err){
//             return res.status(400).json({
//                 msg:"error in course"
//             });
//         }
//     else{
//         req.mProfile.myCourse.push(mc._id);
//         req.mProfile.save((err,user)=>{
//             if(err){
//                 return res.status(400).json({
//                     errror: "error to create db"
//                 });
//             }
//             res.json({
//                 mc,
//                 user
//             });
//         });
//     }
//     });

//     // const mProfile=req.mProfile;
//     // const course=req.course;
//     // const mycourse=new MyCourse(req.body);
//     // mycourse.myCourse.push(course._id);
//     // mycourse.save((err,mycourse)=>{
//     //     if(err){
//     //         return res.status(400).json({
//     //             error: "Error in DB"
//     //         });
//     //     }

//     //     mProfile.myCourse.push(mycourse._id);
//     //     mProfile.save((err,user)=>{
//     //         if(err){
//     //             return res.status(400),json({
//     //                 error: "Error in DB"
//     //             });
//     //         }
//     //         res.json({
//     //             mycourse,
//     //             user
//     //         });
//     //     })
//     // });
// };


// //middleware

// exports.isPurchased=(req,res,next)=>{
//     // const course=req.course;
//     const mycourse=req.mycourse;
//     var today=new Date();
//     var timeDuration=mycourse.purchasedate.getTime()-today.getTime();
//     var dayDuration=timeDuration/(1000 * 3600 * 24);

//     Course.findById({_id:mycourse.course}).exec((err,course)=>{
//         if(err || !course){
//             return res.status(400).json({
//                 error: "Error to find course"
//             });  
//         }else{
//             if(mycourse.purchased == true && dayDuration==mycourse.validationDay){
//                 next();
//             }else{
//                 return res.status(400).json({
//                     error: "Error Access Denied"
//                 });
//             }
//         }
//     });
// };



const MyCourse=require("../models/mycourse");
const Course=require("../models/course");
const User=require("../models/user");
var Insta = require('instamojo-nodejs');

exports.getMyCourseById=(req,res,next,id)=>{
    MyCourse.findById(id).exec((err,mycourse)=>{
        if(err){
            return res.status(400).json({error: "Error in DB"});
        }
        req.mycourse=mycourse;
        res.json(mycourse);
        next();
    });
};

exports.getMyCourse=(req,res)=>{
   
    const mycourse=req.mycourse;
    res.json(mycourse);
   
};

exports.getAllMyCourseByUser=(req,res)=>{
    let mProfile=req.mProfile;
    MyCourse.find({_id:mProfile.myCourse,purchased: true}).exec((err,mycourses)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(mycourses);
    });
};



exports.addMyCourse=(req,res)=>{

   let mProfile=req.mProfile;
   let course=req.course;
   let ycourse=new MyCourse(req.body);

    
   Insta.setKeys('21e54a28aeb8734433d22d2d94cfd6f4','01c83ed0320fefa421d617893e98cc47');
   var data = new Insta.PaymentData();
   data.purpose= course.name;
   data.amount= course.amount;
   data.phone= mProfile.phone;
   data.buyer_name= mProfile.firstname+ " " +mProfile.lastname;
   //data.redirect_url= 'http://localhost:3000/user/dashboard/courses',
   data.send_email= true;
    //webhook: 'http://www.example.com/webhook/',
   data.send_sms= true;
   data.email= mProfile.email;
   data.allow_repeated_payments= true;
         
   Insta.createPayment(data, function(error, response) {
       if (error) {
            res.json({
                msg:"unsuccessfull"
            })
        } else {
            let responseData = JSON.parse( response );
			let redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );
			res.status( 200 ).json(
               redirectUrl
            );
    }
    });  
    

    












   
    
    // if(course.amount > 0 && course.amount != 0){
    // var headers = { 'X-Api-Key': '21e54a28aeb8734433d22d2d94cfd6f4', 'X-Auth-Token': '01c83ed0320fefa421d617893e98cc47'}
    // var payload = {
    //     purpose: course.name,
    //     amount: course.amount,
    //     phone: mProfile.phone,
    //     buyer_name: mProfile.fisrtname+ "" +mProfile.lastname,
    //    // redirect_url: 'http://www.example.com/redirect/',
    //     send_email: true,
    //     //webhook: 'http://www.example.com/webhook/',
    //     send_sms: true,
    //     email: mProfile.email,
    //     allow_repeated_payments: false
    // }
    //     request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
    //         if(!error && response.statusCode == 201){
    //             mycourse.myCourse.push(course._id);
    //             mycourse.save((err,mycourse)=>{
    //                 if(err){
    //                     return res.status(400).json({
    //                         error: "Error in DB"
    //                     });
    //                 }
            
    //                 mProfile.myCourse.push(mycourse._id);
    //                 mProfile.save((err,user)=>{
    //                     if(err){
    //                         return res.status(400),json({
    //                             error: "Error in DB"
    //                         });
    //                     }
    //                     res.json({
    //                         mycourse,
    //                         user
    //                     });
    //                 })
    //             });  
    //         }else{
    //             res.json({
    //                 msg:"Error in Payment Request"
    //             });
    //         }
    //       });
    
    //   }else{
    //     mycourse.myCourse.push(course._id);
    //     mycourse.save((err,mycourse)=>{
    //         if(err){
    //             return res.status(400).json({
    //                 error: "Error in DB"
    //             });
    //         }
    
    //         mProfile.myCourse.push(mycourse._id);
    //         mProfile.save((err,user)=>{
    //             if(err){
    //                 return res.status(400),json({
    //                     error: "Error in DB"
    //                 });
    //             }
    //             res.json({
    //                 mycourse,
    //                 user
    //             });
    //         })
    //     });
    //   }

    
};



//middleware
exports.isPurchased=(req,res,next)=>{
    // const course=req.course;
    const mycourse=req.mycourse;
    var today=new Date();
    var timeDuration=mycourse.purchasedate.getTime()-today.getTime();
    var dayDuration=timeDuration/(1000 * 3600 * 24);

    Course.findById({_id:mycourse.course}).exec((err,course)=>{
        if(err || !course){
            return res.status(400).json({
                error: "Error to find course"
            });  
        }else{
            if(mycourse.purchased == true && dayDuration==mycourse.validationDay){
                next();
            }else{
                return res.status(400).json({
                    error: "Error Access Denied"
                });
            }
        }
    });
};

