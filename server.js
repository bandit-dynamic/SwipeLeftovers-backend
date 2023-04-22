///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();

// const { PORT } = process.env;
const PORT = process.env.PORT || 4000
// import express
const express = require("express");
// create application object
const app = express();
const routes = require('./routes/index');
const cors = require("cors");


///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
//  app.get("/", (req, res) => {
//   res.send("hello world");
//  });
app.use("/", routes);


app.use((req,res) => {
  res.status(404).json({message: "NOT A PROPER ROUTE"})
})



"use strict";



///////////////////////////////
// LISTENER
////////////////////////////////
// app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});