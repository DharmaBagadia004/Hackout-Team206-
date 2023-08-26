const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const cookieparser= require("cookie-parser");
const jwt= require("jsonwebtoken");
const Admin = require("../models/Admin");


router.use(cookieparser());

//REGISTER

router.post("/signup", async (req, res) => {
  console.log(`username : ${req.body.username}`)
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
        
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log("error" + err)
    res.status(500).json(err);
  }
});

router.post("/signin", async (req, res) => {
  console.log(`email : ${req.body.email}`)
  try {
    const user = await User.findOne({ email: req.body.email });
    const admin = await Admin.findOne({ email: req.body.email });
    if (!user && !admin) {
      return res.status(400).json({ error: 'User not found' });
    }

    let token;
    if(user){
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    token= await user.generatetoken();
    console.log(`token generated is ${token}`);

  }

  else{
    const validate = req.body.password===admin.password?true:false; 
    if (!validate) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    token= await admin.generatetoken();
    console.log(`token generated is ${token}`);

  }
    

    res.cookie("jwtoken", token,{
      expires: new Date(Date.now()+2592000000),
      httpOnly: false,
    });
    if(user)
    res.cookie("name",user.username,{ expires: new Date(Date.now()+2592000000),httpOnly: false});
    if(admin)
    res.cookie("name",admin.username,{ expires: new Date(Date.now()+2592000000),httpOnly: false});
    console.log("cookie generated");
    // const { password, ...userData } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FORGOT PASSWORD
router.put("/forgot-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!user && !admin) {
      return res.status(400).json({ error: 'User not found' });
    }

    let updatedUser;
    if (user) {
      // Generate a new hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      // Update the user's password
      updatedUser = await User.findByIdAndUpdate(user._id, { password: hashedPass }, { new: true });
    } else {
      // Generate a new hashed password for admin
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      // Update the admin's password
      updatedUser = await Admin.findByIdAndUpdate(admin._id, { password: password }, { new: true });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGOUT
router.get("/logout",async (req, res) => {
  res.clearCookie("jwtoken");
  res.clearCookie("name");
  res.send();
});

router.get("/isadmin",async (req, res) => {
  if(req.cookies.jwtoken){
  const token=req.cookies.jwtoken;
  const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
  const admin=await Admin.findOne({_id:verifytoken._id});
  console.log("admin found")
  if(admin)
  res.json(true);
  else
  res.json(false);
}});

module.exports = router;
