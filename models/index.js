const mongoose = require('mongoose')
const {MONGODB_URI} = process.env
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
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
