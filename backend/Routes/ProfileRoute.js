const express = require('express');
const User = require('../Models/User');
const router = express.Router();

router.get('/test', async(req, res) => {

    res.send("Hi!");

});

router.get('/fetchusers/:currentUserId', async (req, res) => {
  const { currentUserId } = req.params;

  try {
    const currentUser = await User.findOne({ auth0UserId: currentUserId });

    if (!currentUser) return res.status(404).json({ message: "User not found" });

    const swipedUsers = [
      currentUser.auth0UserId,
      ...currentUser.acceptedUsers,
      ...currentUser.declinedUsers
    ];

    const usersToShow = await User.find({
      auth0UserId: { $nin: swipedUsers }
    });

    res.json(usersToShow);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ error: "Server error" });
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

// Push users to accepted array in MongoDB database

router.post('/accept', async (req, res) => {
  const { userId, targetUserId } = req.body;

  try {
    const user = await User.findOne({ auth0UserId: userId });
    if (!user.acceptedUsers.includes(targetUserId)) {
      user.acceptedUsers.push(targetUserId);
      await user.save();
    }
    res.status(200).json({ message: 'User accepted!' });
  } catch (err) {
    res.status(500).json({ error: 'Error accepting user' });
  }
});


// Push users to declined array in MongoDB database
router.post('/decline', async (req, res) => {
  const { userId, targetUserId } = req.body;

  try {
    const user = await User.findOne({ auth0UserId: userId });
    if (!user.declinedUsers.includes(targetUserId)) {
      user.declinedUsers.push(targetUserId);
      await user.save();
    }
    res.status(200).json({ message: 'User declined!' });
  } catch (err) {
    res.status(500).json({ error: 'Error declining user' });
  }
});

// helper method to store match in database for checkMatch endpoint 

const storeMatch = async (userAId, userBId) => {
  const userA = await User.findOne({ auth0UserId: userAId });
  const userB = await User.findOne({ auth0UserId: userBId });

  if (!userA || !userB) return;

  // If UserA's matches don't already have UserB, then add userB and save
  if (!userA.matches.includes(userBId)) {
    userA.matches.push(userBId);
    await userA.save();
  }

  // Same functionality as before just switched around
  if (!userB.matches.includes(userAId)) {
    userB.matches.push(userAId);
    await userB.save();
  }
};

router.post('/checkMatch', async (req, res) => {
  const { userId, targetUserId } = req.body;

  try {
    const targetUser = await User.findOne({ auth0UserId: targetUserId });

    if (!targetUser) return res.status(404).json({ message: "Target user not found" });

    const isMatch = targetUser.acceptedUsers.includes(userId);

    if (isMatch) {
      await storeMatch(userId, targetUserId);
      return res.status(200).json({ match: true });
    }

    return res.status(200).json({ match: false });

  } catch (error) {
    console.error("Error", error);
  }
});


router.get('/getmatches/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findOne({ auth0UserId: userId });

    const matchedUsers = await User.find({
      auth0UserId: { $in: currentUser.matches }
    });

    res.json(matchedUsers);
  } catch (error) {
    console.error("Error match:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});








module.exports = router; 

