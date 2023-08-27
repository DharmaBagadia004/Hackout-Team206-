const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require("../models/Eventconduct");
const authenticateuser = require('../middleware/authenticateuser');
const authenticate = require('../middleware/authenticate');

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

router.get("/event/:amount",async(req,res)=>{
    try{
      let a=Number(req.params.amount);
      console.log(a)
      
        const events=await Event.find().limit(a);
        const modifiedEvents = events.map(event => ({
          _id: event._id,
          eventName: event.eventName,
          date: event.date,
          time: event.time,
          description: event.description,
          location: event.location,
          mode: event.mode,
          conductedby: event.conductedby,
          registeredUsers:event.registeredUsers,
          eventLink: event.eventLink,
          photo: event.photo ? `data:${event.photo.contentType};base64,${event.photo.data.toString('base64')}` : null
        }));
        res.status(200).json(modifiedEvents);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

router.post('/event', upload.single('photo'), async (req, res) => {
  //console.log(`eventname : ${req.body.eventName}, startDate : ${req.body.date} , description : ${req.body.description}, eventLink : ${req.body.eventLink}`)
  if(req.cookies.jwtoken){
  try {
    const {eventName,date,time,description,location,mode,eventLink} = req.body;
    const file = req.file;
    const token=req.cookies.name;
    const conductedby=token;
    let event;

    if(file){
      event = new Event({eventName,date,time,conductedby,photo: {data: file.buffer,contentType: file.mimetype},description,location,mode,eventLink});
    }
    else{
      event = new Event({eventName,date,time,description,conductedby,location,mode,eventLink});
    }
    const savedEvent=await event.save();
    console.log("event created");
    res.status(200).json(savedEvent);
  } catch (err) {
    console.log("Error : " + err)
    res.status(500).json({ error: 'Failed to create event' });
  }}
  else{
    res.status(500).json({ error: 'Failed to create event' });
  }}
  );

// router.put("/event/:id", async (req, res) => {
//     try {
//       const { eventname, eventdate, description } = req.body;
//       const event = await Event.findByIdAndUpdate(
//         req.params.id,
//         { eventname, startdate,enddate, description },
//         { new: true }
//       );
//       if (!event) {
//         return res.status(404).json({ message: "Event not found" });
//       }
//       res.json(event);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
  
  router.delete("/event/:id",authenticate, async (req, res) => {
    try {
      
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;