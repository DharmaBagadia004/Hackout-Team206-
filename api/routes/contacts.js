const router = require("express").Router();
const authenticateuser = require('../middleware/authenticateuser');
const Contact = require('../models/Contact');


router.post("/contact/:message",authenticateuser, async (req, res) => {
    try{
        const mymessage = req.params.message;
        let newContact = new Contact({
            username: req.user.username,
            email: req.user.email,
            message: mymessage,
        });
        console.log(mymessage);
        const savedcontact = await newContact.save();
        res.status(201).json("success");
    }catch(err){
        console.log('Error:', err);
        res.status(500).json(err);
    }
});
  
module.exports = router;
