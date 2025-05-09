const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})


// Endpoint (with Multer middleware)  that handles uploading the image
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: 'Upload failed' });
        }

        const user = await User.findOne({ auth0UserId: req.body.userId });
        user.profileImage = result.secure_url;
        await user.save();

        res.status(200).json({ message: "Uploaded successfully", url: result.secure_url });
      }
    );

    result.end(req.file.buffer); //tell Cloudinary to upload the image by closing the stream
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// create new user
router.post('/sync', async (req, res) => {

    try {

        const { auth0UserId } = req.body;
        let user = await User.findOne({ auth0UserId});
        if (!user) {
            user = new User({ auth0UserId});
            await user.save();
        }


        //console.log(auth0UserId);
        res.status(200).send('Received');

    }
    
    
    catch (err) {

        console.error(err);

    }

});


// Endpoint that returns whether a user's registration information is filled out 
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

// Endpoint (with Multer middleware) that sends user's information to store in MongoDB

router.post('/register', upload.single('profileImage'), async (req, res) => {


    const { name, age, location, pronouns, genderIdentity,
    datePreference, relationshipType, ethnicity, religion,
    bio, education, job, auth0UserId, socialMediaHandle,
    ...aboutYouFields } = req.body;

    const profileImage = req.file ? req.file.path : null;


    try {
      const updateFields = {
        name, age, location, pronouns, genderIdentity,
        datePreference, relationshipType, ethnicity,
        religion, bio, education, job,
        profileImage, socialMediaHandle, 
        ...aboutYouFields
      };
  
      const updatedUser = await User.findOneAndUpdate(
        { auth0UserId },
        updateFields,
        { new: true, upsert: true }
      );
  

        res.status(200).json({ message: "User updated successfully "});


    } catch (err) {

        console.error(err);

    }


});


// Find current profile 
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

  // Update responses in profile editing section

  router.put('/update', async (req, res) => {
    const { auth0UserId, ...updates } = req.body;
  
    const aboutFields = [
      "hobbies", "dealbreakers", "bestJoke", "dinnerGuest", "perfectDay",
      "finalMeal", "mostGrateful", "accomplishment", "valueFriendship",
      "treasuredMemory", "terribleMemory", "loveLanguage", "lastCried",
      "seriousJoke", "travelDestination", "nextCity"
    ];
  
    const fieldsToSet = {};
    const fieldsToUnset = {};
  
    for (const field of aboutFields) {
      if (field in updates) {
        // User sent a value for this field:
        fieldsToSet[field] = updates[field];
      } else {
        // Client did NOT send it → we’ll unset it in the database
        fieldsToUnset[field] = ""; 
      }
    }
  
    try {
      const updateQuery = {
        // updating aboutFields accordingly using set and unset update operations
        $set: {
          ...updates,
          ...fieldsToSet,
        },
        $unset: fieldsToUnset,
      };
  
      const updatedUser = await User.findOneAndUpdate(
        { auth0UserId },
        updateQuery,
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
