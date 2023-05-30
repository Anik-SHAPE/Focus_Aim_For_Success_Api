const User=require("../models/user");

exports.getUserById=(req,res,next,id)=>{
  User.findById(id).exec((err,user)=>{
      if(err || !user){
          return res.status(400).json({
              error: "No user was found in DB"
          })
      }
      req.mProfile=user;
      next();
  });
};

exports.getUser=(req,res)=>{
    req.mProfile.salt=undefined;
    req.mProfile.photo=undefined;
    req.mProfile.encry_password=undefined;
    req.mProfile.createdAt=undefined;
    req.mProfile.updatedAt=undefined;
    res.send(req.mProfile);
};

exports.photo = (req, res) => {
    if (req.mProfile.photo.data) {
        res.set("Content-Type", req.mProfile.photo.contentType);
        return res.send(req.mProfile.photo.data);
    }
    // next();
};

exports.getAllUsers=(req,res)=>{
    User.find().exec((err,users)=>{
        if(err || !users){
            return res.status(402).json({
                error: "Users not found in DB"
            });
        }

       

         res.json(users);
        
        
    });
};


exports.updateUser=(req,res)=>{

    User.findOneAndUpdate(
        {_id:req.mProfile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err,user)=>{
         if(err){
          res.status(400).json({
            err: "ERROR OCCURD UPDATING CHAPTER DB"
          });
         }
         res.json(user);
        }
      );





};


exports.delUser=(req,res)=>{
  const mProfile=req.mProfile;
  mProfile.remove((err,user)=>{
     if(err){
        return res.status(400).json({
            error: "Failed to delete"
        });
     }
     res.json({
         message: "User successfully deleted"
     });
  })  
};



exports.getAllContentWriter=(req,res)=>{

    User.find({role: 0}).exec((err,users)=>{

        if(err){
            return res.status(400).json({
                message: "DB connection error"
            });
        }

        res.json(users);


    });


 };


exports.getAllAdmin=(req,res)=>{

    User.find({role: 1}).exec((err,users)=>{

        if(err){
            return res.status(400).json({
                message: "DB connection error"
            });
        }

        res.json(users);


    });


};



   exports.getAllNormalUser=(req,res)=>{

    User.find({role: 2}).exec((err,users)=>{

        if(err){
            return res.status(400).json({
                message: "DB connection error"
            });
        }

        res.json(users);


    });


 };