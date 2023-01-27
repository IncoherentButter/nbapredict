/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
// import {getSumOfSquareDistances} from "./ranking-logic.js";
// import {sample_western_standings, sample_eastern_standings} from "./actual-standings.js";
// import {teams} from "./actual-standings.js";

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
// const League = require("./models/league");
const StandingPrediction = require("./models/standingprediction");


// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|


const data = {
  prediction: [
    {
      user_id: 0,
      westStandings: [],
      eastStandings: [],
    }
  ]
}

const westStandings = [];
const eastStandings = [];


// router.get("/user", (req, res) => {
//   User.findById(req.query.userid).then((user) => {
//     res.send(user);
//   });
// });

// router.post("/user", (req, res) => {
//   const newUser = new User({
//     name: req.user.name,
//     googleid: req.user.googleid,
//   });

//   newStory.save().then((newUser) => res.send(newUser));
// });

// Send back a prediction to the frontend!
router.get("/standingprediction", (req, res) => {
  // find user -> find league -> return standingprediction


  //-------WORKSHOP 5 METHOD------------
  console.log(`Req input for get standingpreds: ${req.user_id}`);
  // const userId = req.query.user_id;

  // // return the standings for user's with the same ID as in the GET request.
  // const filteredStandings = data.prediction.filter((prediction) => {
  //   return prediction.user_id == userId;
  // })

  // res.send(filteredStandings.westStandings, filteredStandings.eastStandings); //workshop 5
  //------------------------------------

  //-------WORKSHOP 6 METHOD------------
  // pull from StandingPrediction collection, unfiltered, then send those results
  StandingPrediction.find({user_id: req.query.user_id}).then((standingPredictions) => {
    res.send(standingPredictions)
  })

  //------------------------------------

  //--NOT SURE IF BELOW WORKS
  // User.findById(req.query.user_id).then(() => {
  //   // res.send(getSumOfSquareDistances(req.west_predictions, sample_western_standings) + getSumOfSquareDistances(req.east_predictions, sample_eastern_standings));
  //   StandingPrediction.find({}).then()
  //   westStandings = req.query.west_predictions; 
  //   eastStandings = req.query.east_predictions;
  //   res.send(westStandings, eastStandings);
  // });
  //------------------------------------
});

router.post("/standingprediction", (req, res) => {
  console.log(`Received a standing prediction from ${req.user_id}`);
  console.log(`Req = ${req}`);

  //------------WORKSHOP 5 METHOD----------
  // const newWS5Prediction = {
  //   user_id: data.prediction.length,
  //   westStandings: [],
  //   eastStandings: [],
  // };

  // data.prediction.push(newWS5Prediction);
  // res.send(newWS5Prediction);

  // const newStandingPrediction = new StandingPrediction({
  //   user_id: req.user._id,
  //   west_predictions: req.body.west_predictions,
  //   east_predictions: req.body.east_predictions,
  // });
  //----------------------------------------

  //------------WORKSHOP 6 METHOD---------
  const newStandingPrediction = new StandingPrediction({
    user_id: req.body.user_id,
    west_predictions: req.body.west_predictions,
    east_predictions: req.body.east_predictions,
  });

  //Save the Mongoose document and then send it back to the client
  newStandingPrediction.save().then((newStandingPrediction) => res.send(newStandingPrediction));

  //--------------------------------------

  // const west_score = getSumOfSquareDistances(newStandingPrediction.west_predictions, sample_western_standings);
  // const east_score = getSumOfSquareDistances(newStandingPrediction.east_predictions, sample_eastern_standings);
  // const total_score = west_score + east_score;
  
  //socket update here
  // call a socket-defined plugin that updates user prediction data
  // if (req.user){

  // }

  // newStandingPrediction.save().then((newStandingPrediction) => res.send(newStandingPrediction)); 
});


//----------END My API Methods------------------

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
