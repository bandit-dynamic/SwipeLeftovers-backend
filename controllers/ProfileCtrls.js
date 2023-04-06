
// UPDATE ROUTE
const updateProfile = (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedProfile) => {
        if(!updatedProfile){
            res.status(400).json({Message: 'Could not update profile'})
        } else {
            res.status(200).json({Data: updatedProfile, Message: "Person updated"})
        }
    })
    .catch((error) => {
        res.status(500).json({ Message: error.message });
      });
};

//  DESTROY ROUTE
const deleteProfile = (req, res) => {
    Profile.findByIdAndDelete(req.params.id)
      .then((deletedProfile) => {
        if (!deletedProfile) {
          res.status(400).json({ Message: 'Could not delete profile' });
        } else {
          res
            .status(200)
            .json({ Data: deletedProfile, Message: 'Profile deleted' });
        }
      })
      .catch((error) => {
        res.status(500).json({ Message: error.message });
      });
  };
  
  module.exports = {
    getProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
  };
