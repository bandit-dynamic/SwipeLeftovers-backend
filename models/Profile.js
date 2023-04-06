const mongoose = require('mongoose')
///////////////////////////////
// MODELS
////////////////////////////////
const ProfileSchema = new mongoose.Schema({
name: { type: String, required: true},
image: {type: image, required: true},
age: {type: Number, required: false},
bio: {type: String},
email: {type: email, unique: true, required: true}
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;