const mongoose = require('mongoose')
///////////////////////////////
// MODELS
////////////////////////////////
const ProfileSchema = new mongoose.Schema({
name: { type: String, required: true},
image: [{type: String, required: true}],
age: {type: Number, required: false},
bio: {type: String},
email: {type: String, unique: true, required: true},
password: {type: String, required: true}
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;