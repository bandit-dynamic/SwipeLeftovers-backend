const router = require("express").Router()
const ProfileRoute = require("./profileRoutes")




router.use('/Profile', ProfileRoute)

module.exports = router