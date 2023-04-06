const db = require('../models') //this is where our db mongoose connection lives as well as our models


const getProfile = (req, res) => {
   
    db.People.find({})
    .then((foundProfile) => {
        if(!foundProfile){
            res.status(404).json({message: 'Cannot find Profile'})
        } else {
            res.status(200).json({data: foundProfile})
        }
    })
}
// PEOPLE CREATE ROUTE
const createProfile = (req, res) => {
    // res.send('createPeople')
    db.Profile.create(req.body)
    .then((createdProfile) => {
        if(!createdProfile){
            res.status(400).json({message: 'Cannot create Profile'})
        } else {
            res.status(201).json({data: createdPerson, message: 'Profile created'})
        }
    })
}
// PEOPLE UPDATE ROUTE
const updateProfile = (req, res) => {
    db.Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedProfile) => {
        if(!updatedProfile){
            res.status(400).json({Message: 'Could not update profile'})
        } else {
            res.status(200).json({Data: updatedPerson, Message: "Profile updated"})
        }
    })
}

// PEOPLE DESTROY ROUTE
const deleteProfile = (req, res) => {
    db.Profile.findByIdAndDelete(req.params.id)
    .then((deletedProfile) => {
        if(!deletedProfile){
            res.status(400).json({Message: 'Could not delete profile'})
        } else {
            res.status(200).json({Data: deletedPerson, Message: "Profile deleted"})
        }
    })
}

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
}