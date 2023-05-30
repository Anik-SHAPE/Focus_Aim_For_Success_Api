require('dotenv').config();
var mongoose=require('mongoose');
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app=express();
const userauthRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const courseRoutes=require("./routes/course");
const myCourseRoutes=require("./routes/mycourse");

//DB connection
mongoose.connect(process.env.DB,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("DB CONNECTED");
});

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes

//Master User
app.use("/api",userauthRoutes);
app.use("/api",userRoutes);
app.use("/api",courseRoutes);
app.use("/api",myCourseRoutes);

//course




//User

//TODO:User routes will import

//PORT
const port=process.env.PORT || 8000;

//port listening
app.listen(port,()=>{console.log(`server is running at port ${port}`)});
