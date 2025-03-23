const express = require('express');
const User = require('../Models/User');
const router = express.Router();

router.post('/register', async (req, res) => {


    const { name, age, auth0UserID } = req.body;


    try {

        const updatedUser = await User.findOneAndUpdate(
            { auth0UserId: auth0UserID },
            { name: name, age: age},
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