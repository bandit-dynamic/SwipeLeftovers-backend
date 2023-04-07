const router = require("express").Router()
const ProfileRoute = require("./ProfileRoutes")




router.use('/Profile', ProfileRoute)

module.exports = router