const router = require("express").Router();
const User = require("../models/User");
const authenticateuser = require('../middleware/authenticateuser');

// const Post = require("../models/Post");

const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const Admin = require("../models/Admin");
//GET USER

router.get('/profile',  async (req, res) => {
  if(req.cookies.jwtoken){
  try {
    let isadmin=false;
    const token=req.cookies.jwtoken;
    const userid=jwt.verify(token,process.env.TOKEN_KEY);
    if(await Admin.findById(userid._id)){
      isadmin = true;
    }
    console.log(`this is ${isadmin}`)
    if(isadmin===false){
      const user = await User.findById(userid._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  }
else{
  const admin = await Admin.findById(userid._id);
  if (!admin) {
    return res.status(404).json({ message: 'Admin not found' });
  }
  return res.json(admin); 
}} catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }}
  else{
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;