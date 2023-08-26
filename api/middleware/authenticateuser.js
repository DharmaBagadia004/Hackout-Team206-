const jwt= require("jsonwebtoken");
//const router = require("express").Router();
//const cookieparser= require("cookie-parser");
const User = require("../models/User");

//router.use(cookieparser());

const authenticateuser = async(req,res,next)=>{
    try{
        console.log("authentication on way");
        const token=req.cookies.jwtoken;
        console.log(token);
        const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
        console.log("verified");
        const user=await User.findOne({_id:verifytoken._id});
        if(!user) {
            throw new Error("No user found");
        }
        console.log("user found");
        req.token=token;
        req.user=user;
        req.userID=user._id;
        next(); 
    }catch(e){
        
        res.status(401).send('unauthorized user');
        console.log(e);
    }
}
module.exports = authenticateuser;

//module.exports = router;