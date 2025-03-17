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
        res.json({isRegistered: userProfile.isRegistered});
    }

    catch (err) {

        console.error(err);

    }


});


module.exports = router; 
