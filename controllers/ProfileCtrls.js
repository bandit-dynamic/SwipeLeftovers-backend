const db = require('../models')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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
// const createProfile = (req, res) => {
//     // res.send('createProfile')
//     db.Profile.create(req.body)
//     .then((createdProfile) => {
//         if(!createdProfile){
//             res.status(400).json({message: 'Cannot create Profile'})
//         } else {
//             res.status(201).json({data: createdProfile, message: 'Profile created'})
//         }
//     })
// }
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

// ACCOUNT ROUTES
const createProfile = async (req, res) => {
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

// const loginProfile = (req, res) => {
//     const profileLogin = req.body;
//     db.Profile.findOne({email: profileLogin.email})
//     .then(dbProfile => {
//         if (!dbProfile) {
//             return res.status(400).json({Message: "Invalid Email or Password."})
//         }
//         bcrypt.compare(profileLogin.password, dbProfile.password)
//         .then(isCorrect => {
//             if (isCorrect) {
//                 const checkIn = {
//                     id: dbProfile._id,
//                     email: dbProfile.email
//                 }
//                 jwt.sign(
//                     checkIn,
//                     process.env.JWT_SECRET,
//                     {expiresIn: 86400},
//                     (err, token) => {
//                         if (err) return res.status(400).json({Message: err})
//                         console.log("GREAT SUCCSESS")
//                         return res.status(200).json({
//                             Message: "Successful Login",
//                             token: "Bearer" + token
//                         })
//                     }
//                 )
//             } else {
//                 return res.status(400).json({
//                     Message: "Invalid Username or Password"
//                 })
//             }
//         })
//     })
// }

const loginProfile = (request, response) => {
    db.Profile.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt.compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
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
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
}

///Verify the Login
// const verifyJWT = async (req, res, next) => {
//     const token = awaitreq.headers["x-access-token"]?.split(' ')[1]
//     console.log(token)

//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) return res.json({
//                 isLoggedIn: false,
//                 Message: "Failed to Authenticate"
//             })
//             req.profile = {};
//             req.profile.id = decoded.id
//             req.profile.email = decoded.email
//             next()
//         })
//         console.log("YES")
//     } else {
//         res.status(200).json({Message: "Incorrect Token Given", isLoggedIn: false})
//     }
// }

const verifyJWT = async (request, response, next) => {
    try {
      //   get the token from the authorization header
      const token = await request.headers.authorization.split(" ")[1];
  
      //check if the token matches the supposed origin
      const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
  
      // retrieve the user details of the logged in user
      const user = await decodedToken;
  
      // pass the user down to the endpoints here
      request.user = user;
  
      // pass down functionality to the endpoint
      next();
      
    } catch (error) {
      response.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  };

/// ACCESSING THE PROFILES ACCOUNT
// const profileAccess = (verifyJWT, (req, res) => {
//     res.status(200).json({isLoggedIn: true})
//     console.log("GREAT SUCCESS-2")
// })

const profileAccess = (verifyJWT, (request, response) => {
    response.status(200).json({ message: "You are authorized to access me"});
  })

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    loginProfile,
    profileAccess
}