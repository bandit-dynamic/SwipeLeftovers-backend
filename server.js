///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT } = process.env;
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


// app.use((req,res) => {
//   res.status(404).json({message: "NOT A PROPER ROUTE"})
// })



"use strict";

//imports


const imgbbUploader = require("imgbb-uploader");

//route for posting parking images
app.post("/imageupload", (req, res, next) => {
  console.log("reached /imageupload endpoint");
  const options = {
    apiKey: "c749013928a5455e72c09e03ad36d1f2", // MANDATORY apikey for imgBB
    base64string: req.body.base64string,
    // OPTIONAL: pass base64-encoded image (max 32Mb)
  };
  imgbbUploader(options)
    .then((response) => {
      console.log(response);
      return res.status(200).json({
        message: "Uploaded picture successfully",
        image: response.url,
      });
    })
    .catch((error) => console.error(error));
});




///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
