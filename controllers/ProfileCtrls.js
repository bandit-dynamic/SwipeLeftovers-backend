const db = require('../models') 
const getProfile = (req, res) => {
   
    db.Profile.find({})
    .then((foundProfile) => {
        if(!foundProfile){
            res.status(404).json({message: 'Cannot find Profile'})
        } else {
            res.status(200).json({data: foundProfile})
        }
    })
}
// Profile CREATE ROUTE
const createProfile = (req, res) => {
    // res.send('createProfile')
    db.Profile.create(req.body)
    .then((createdProfile) => {
        if(!createdProfile){
            res.status(400).json({message: 'Cannot create Profile'})
        } else {
            res.status(201).json({data: createdProfile, message: 'Profile created'})
        }
    })
}
//  UPDATE ROUTE
const updateProfile = (req, res) => {
    db.Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedProfile) => {
        if(!updatedProfile){
            res.status(400).json({Message: 'Could not update profile'})
        } else {
            res.status(200).json({Data: updatedProfile, Message: "Profile updated"})
        }
    })
}

// DESTROY ROUTE
const deleteProfile = (req, res) => {
    db.Profile.findByIdAndDelete(req.params.id)
    .then((deletedProfile) => {
        if(!deletedProfile){
            res.status(400).json({Message: 'Could not delete profile'})
        } else {
            res.status(200).json({Data: deletedProfile, Message: "Profile deleted"})
        }
    })
}

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
}