const jwt= require("jsonwebtoken");
//const router = require("express").Router();
//const cookieparser= require("cookie-parser");
const Admin = require("../models/Admin");

//router.use(cookieparser());

const authenticate = async(req,res,next)=>{
    try{
        console.log("authentication on way");
        const token=req.cookies.jwtoken;
        console.log(token);
        const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
        console.log("verified");
        const admin=await Admin.findOne({_id:verifytoken._id});
        if(!admin) {
            throw new Error("No admin found");
        }
        console.log("admin found");
        req.token=token;
        req.admin=admin;
        req.userID=admin._id;
        next(); 
    }catch(e){
        res.status(401).send('unauthorized user');
        console.log(e);
    }
}
module.exports = authenticate;

//module.exports = router;