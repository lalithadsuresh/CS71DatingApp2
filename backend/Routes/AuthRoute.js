const express = require('express');
const User = require('../Models/User');
const router = express.Router();

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

router.post('/register', async (req, res) => {


    const { name, age, location, pronouns, genderIdentity,
        datePreference,
        relationshipType,
        ethnicity,
        religion,
        bio,
        education,
        job,
        auth0UserId } = req.body;


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
                job: job},
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


module.exports = router; 
