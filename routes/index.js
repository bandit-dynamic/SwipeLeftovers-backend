const router = require("express").Router()
const ProfileRoute = require("./ProfileRoutes")
const UserRoutes = require('./UserRoutes');



router.use('/Profile', ProfileRoute)

module.exports = router