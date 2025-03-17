const express = require('express');
const User = require('../Models/User');
const router = express.Router();

router.post('/sync', async (req, res) => {

    try {

        const { auth0UserId } = req.body;
        console.log(auth0UserId);
        res.status(200).send('Received');

    }
    
    catch (err) {

        console.error(err);

    }

});

router.post('/registered', async (req, res) => {

    try {
        const userProfile = await User.findOne({auth0UserId});
        res.json({isRegistered: userProfile.isRegistered});
    }

    catch (err) {

        console.error(err);

    }


});


module.exports = router; 
