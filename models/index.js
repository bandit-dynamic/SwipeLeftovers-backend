const mongoose = require('mongoose')
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
///LINKING TO DATABASE
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: false
})
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

  //all code above this

module.exports = {
  Profile: require('./Profile')
  // User: require('./User')
}
