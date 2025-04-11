const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });


router.post('/sync', async (req, res) => {

    try {

        const { auth0UserId } = req.body;
        let user = await User.findOne({ auth0UserId});
        if (!user) {
            user = new User({ auth0UserId});
            await user.save();
        }


        console.log(auth0UserId);
        res.status(200).send('Received');

    }
    
    
    catch (err) {

        console.error(err);

    }

});

router.post('/registered', async (req, res) => {


    const { auth0UserId } = req.body;


    try {
        const userProfile = await User.findOne({auth0UserId});

        if (!userProfile) {
            return res.status(404).json({ error: 'User not found '});
        }

        const isRegistered = userProfile.name && userProfile.name;


        res.json({isRegistered: !!isRegistered});
    }

    catch (err) {

        console.error(err);

    }


});

router.post('/register', upload.single('profileImage'), async (req, res) => {


    const { name, age, location, pronouns, genderIdentity,
        datePreference,
        relationshipType,
        ethnicity,
        religion,
        bio,
        education,
        job,
        auth0UserId } = req.body;

    const profileImage = req.file ? req.file.path : null;


    try {

        const updatedUser = await User.findOneAndUpdate(
            { auth0UserId: auth0UserId },
            { name: name, age: age, location: location, pronouns: pronouns,
                genderIdentity: genderIdentity,
                datePreference: datePreference,
                relationshipType: relationshipType,
                ethnicity: ethnicity,
                religion: religion,
                bio: bio,
                education: education,
                job: job,
                profileImage: profileImage},
            { new: true}

        );

        if (!updatedUser) {
            return res.status(404).json({ message: "No user"});
        }

        res.status(200).json({ message: "User updated successfully "});


    } catch (err) {

        console.error(err);

    }


});

router.get('/profile/:auth0UserId', async (req, res) => {
    try {
      const user = await User.findOne({ auth0UserId: req.params.auth0UserId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching profile" });
    }
  });

router.put('/update', async (req, res) => {
    console.log("Received update payload:", req.body); // for debugging
  
    const { auth0UserId, ...updates } = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { auth0UserId },
        { $set: updates },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.error("Error updating profile", err);
      res.status(500).json({ error: "Update failed" });
    }
  });
  

module.exports = router; 
