const express = require('express');
const User = require('../Models/User');
const router = express.Router();

router.get('test', async(req, res) => {

    res.send("Hi!");

});

router.get('/fetchusers/:currentUserId', async (req, res) => {
    const auth0UserId = req.params.currentUserId;
  
    try {
      const currentUser = await User.findOne({ auth0UserId });
  
      if (!currentUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const usersToDisplay = await User.find({
        _id: { $ne: currentUser._id } 
      });

      console.log(usersToDisplay);
      res.status(200).json(usersToDisplay); 
  
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.post('/register', async (req, res) => {


    const { name, age, location, auth0UserID } = req.body;


    try {

        const updatedUser = await User.findOneAndUpdate(
            { auth0UserId: auth0UserID },
            { name: name, age: age, location: location },
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

