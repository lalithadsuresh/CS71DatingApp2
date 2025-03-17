const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// userModel should keep track of userProfileData

const UserSchema = new mongoose.Schema({

    auth0UserId: {type: String, required: true},
    isProfileComplete: {type: Boolean, default: false}
    

})

const User = mongoose.model('User', UserSchema);

module.exports = User;