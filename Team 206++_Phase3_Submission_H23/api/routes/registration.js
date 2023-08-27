const express = require('express');
const router = express.Router();
const authenticateuser = require('../middleware/authenticateuser');
const User = require("../models/User");
const Event = require("../models/Eventconduct");
const jwt= require("jsonwebtoken");

router.post('/register/:id',authenticateuser,async(req,res)=>{
try{
    console.log("registering user");
    const event = await Event.findById(req.params.id);
    const token=req.cookies.jwtoken;
    const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
    const rootuser=await User.findOne({_id:verifytoken._id});
    console.log(event.eventName);
    console.log(rootuser.registeredEvents);
    if(rootuser.registeredEvents.includes(event.eventName)){
        console.log(true);
        res.send("already registered")
    }
    else{
        console.log(false);
    event.registeredUsers=event.registeredUsers.concat(rootuser.username);
   // event.user_count=event.registered_users.size();
    rootuser.registeredEvents=rootuser.registeredEvents.concat(event.eventName);
    await event.save();
    await rootuser.save();
    
    console.log(event);
    console.log(rootuser);
    console.log("registration successful");
    res.send("thank you for registering");
    }
}catch(err){
    res.status(500).send(err);
}
})

module.exports=router;