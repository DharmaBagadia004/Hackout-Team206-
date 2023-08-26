const express = require('express');
const router = express.Router();
const multer = require('multer');
const Speaker = require('../models/Speaker');
const authenticate = require('../middleware/authenticate');

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

// CREATE Speaker
router.post('/speaker',authenticate, upload.single('photo'), async (req, res) => {
  //console.log("creating new speaker");
  const { name, profession, role,facebook,linkedin,twitter } = req.body;
  
  // Get the uploaded file from memory
  const file = req.file;

  let newSpeaker;
  
  if(file){
    newSpeaker = new Speaker({
      name: name,
      profession: profession,
      photo: {
        data: file.buffer, // Set the photo data to the uploaded file's buffer data
        contentType: file.mimetype, // Set the photo content type
      },
      role: role,
      facebook: facebook,
      linkedin: linkedin,
      twitter: twitter,
    });
  }
  else{
    newSpeaker = new Speaker({
      name: name,
      profession: profession,
      role: role,
      facebook: facebook,
      linkedin: linkedin,
      twitter: twitter,
    });
  }

  try {
    const savedSpeaker = await newSpeaker.save();
    console.log("speaker created");
    res.status(200).json(savedSpeaker);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

// GET ALL SPEAKERS
router.get('/speaker', async (req, res) => {
  try {
    const speakers = await Speaker.find();
    const modifiedSpeakers = speakers.map(speaker => ({
      _id: speaker._id,
      name: speaker.name,
      profession: speaker.profession,
      role: speaker.profession,
      facebook: speaker.facebook,
      linkedin: speaker.linkedin,
      twitter: speaker.twitter,
      photo: speaker.photo ? `data:${speaker.photo.contentType};base64,${speaker.photo.data.toString('base64')}` : null
    }));
    res.status(200).json(modifiedSpeakers);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});


// DELETE SPEAKER
router.delete('/speaker/:id',authenticate ,async (req, res) => {
  const speakerId = req.params.id;

  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(speakerId);
    if (!deletedSpeaker) {
      return res.status(404).json({ error: 'Speaker not found' });
    }
    res.status(200).json({ message: 'Speaker deleted successfully' });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
