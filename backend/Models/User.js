const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// userModel should keep track of userProfileData

const UserSchema = new mongoose.Schema({

    auth0UserId: {type: String, required: true},
    isRegistered: {type: Boolean, default: false},
    
    //profile info
    name: {type: String},
    age: {type: Number},
    location: {type: String},
    pronouns: {type: String}, 
    genderIdentity: {type: String},
    datePreference: {type: String},
    relationshipType: {type: String},
    ethnicity: {type: String},
    religion: {type: String},
    bio: {type: String},  
    education: {type: String},
    job: {type: String},
    auth0UserId: {type: String},
    swipedOn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    profileImage: { type: String },


})

const User = mongoose.model('User', UserSchema);

module.exports = User;