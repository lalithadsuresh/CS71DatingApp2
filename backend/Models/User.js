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
    swipedOn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    acceptedUsers: [String], 
    declinedUsers: [String],
    matches: [String],
    profileImage: { type: String },
    hobbies: { type: String },
    dealbreakers: { type: String },
    bestJoke: { type: String },
    dinnerGuest: { type: String },
    perfectDay: { type: String },
    finalMeal: { type: String },
    mostGrateful: { type: String },
    accomplishment: { type: String },
    valueFriendship: { type: String },
    treasuredMemory: { type: String },
    terribleMemory: { type: String },
    loveLanguage: { type: String },
    lastCried: { type: String },
    seriousJoke: { type: String },
    travelDestination: { type: String },
    nextCity: { type: String }
      

})

const User = mongoose.model('User', UserSchema);

module.exports = User;