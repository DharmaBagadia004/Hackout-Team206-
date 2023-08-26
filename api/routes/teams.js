const express = require('express');
const router = express.Router();
const multer = require('multer');
const Team = require('../models/Team');
const authenticate = require('../middleware/authenticate');

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

//CREATE TEAM
router.post('/team',authenticate, upload.single('photo'), async (req, res) => {
  console.log("creating team");
    const { name, noOfMembers, nameOfLeader, nameOfMembers, facebook, linkedin, twitter } = req.body;

    const file = req.file;
    let newTeam;
    if (file) {
      newTeam = new Team({
        name: name,
        noOfMembers: noOfMembers,
        nameOfLeader: nameOfLeader,
        nameOfMembers: nameOfMembers.split(','),
        photo: {
          data: file.buffer, 
          contentType: file.mimetype, 
        },
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
      });
    } else {
      newTeam = new Team({
        name: name,
        noOfMembers: noOfMembers,
        nameOfLeader: nameOfLeader,
        nameOfMembers: nameOfMembers.split(','),
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
      });
    }
  
    try {
      const savedTeam = await newTeam.save();
      console.log("team created");
      res.status(200).json(savedTeam);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    }
  });
  
  // GET ALL TEAMS
  router.get('/team', async (req, res) => {
    console.log("team reading");
    try {
      const teams = await Team.find();
      const modifiedTeams = teams.map(team => {
        let modifiedTeam = {
          _id: team._id,
          name: team.name,
          noOfMembers: team.noOfMembers,
          nameOfLeader: team.nameOfLeader,
          nameOfMembers: team.nameOfMembers,
          facebook: team.facebook,
          linkedin: team.linkedin,
          twitter: team.twitter
        };
  
        if (team.photo && team.photo.data) {
          modifiedTeam.photo = `data:${team.photo.contentType};base64,${team.photo.data.toString('base64')}`;
        }
        return modifiedTeam;
      });
      res.status(200).json(modifiedTeams);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    }
  });
  


  // DELETE TEAM
  router.delete('/team/:id', authenticate, async (req, res) => {
    const teamId = req.params.id;
  
    try {
      const deletedTeam = await Team.findByIdAndDelete(teamId);
      if (!deletedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    }
  });
  


module.exports = router;
