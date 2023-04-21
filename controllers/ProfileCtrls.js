const db = require('../models')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = process.env



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


//  UPDATE ROUTE
const updateProfile = (req, res) => {
    req.body.image = req.body.image.split(',')
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

// ACCOUNT ROUTES
const createProfile = async (req, res) => { 
  req.body.image=req.body.image.split(',')
    const profile = req.body;
    const salt = bcrypt.genSaltSync(10)
    const takenEmail = await db.Profile.findOne({email: profile.email})

    if (takenEmail) {
        res.status(400).json({Message: "Email has already been used."})
    } else {
        profile.name = (req.body.name)
        profile.image = (req.body.image)
        profile.age = (req.body.age)
        profile.bio = (req.body.bio)
        profile.password = await bcrypt.hash(req.body.password, salt)

        const dbProfile = new db.Profile ({
            name: profile.name,
            image: profile.image,
            age: profile.age,
            bio: profile.bio,
            email: profile.email,
            password: profile.password
        })
        dbProfile.save()
        res.status(200).json({Message: "Profile Created.",
      dbProfile})
    }
    
}


const loginProfile = (req, res) => {
    db.Profile.findOne({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt.compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
          );
          //   return success response
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
}


// const verifyJWT = async (request, response, next) => {
//     try {
//       //   get the token from the authorization header
//       const token = await request.headers.authorization.split(" ")[1];
  
//       //check if the token matches the supposed origin
//       const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
  
//       // retrieve the user details of the logged in user
//       const user = await decodedToken;
  
//       // pass the user down to the endpoints here
//       request.user = user;
  
//       // pass down functionality to the endpoint
//       next();
      
//     } catch (error) {
//       response.status(401).json({
//         error: new Error("Invalid request!"),
//       });
//     }
//   };

// const profileAccess = (verifyJWT, (request, response) => {
//     response.status(200).json({ message: "You are authorized to access me"});
//   })

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    loginProfile
}