const router = require("express").Router()
const profileRoute = require("./profileRoutes")



router.use('/profile', profileRoute);


module.exports = router