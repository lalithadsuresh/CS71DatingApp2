const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// userModel should keep track of userProfileData

const UserSchema = new mongoose.Schema({

    auth0UserId: {type: String, required: true},
    isRegistered: {type: Boolean, default: false},
    
    //profile info
    name: {type: String},
    age: {type: Number}


})

const User = mongoose.model('User', UserSchema);

module.exports = User;