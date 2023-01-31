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
const ActualStanding = require("./models/actualprediction");


// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const e = require("express");
const { Mongoose } = require("mongoose");

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

const cheerio = require('cheerio');
const axios = require('axios');



async function scrape() {
  // const { data } = await axios.get(`https://www.basketball-reference.com/friv/standings.fcgi?month=${cur_month}&day=${cur_day}&year=${cur_year}`);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  // const date = new Date();
  // const cur_month = date.getMonth();
  // const cur_day = date.getDay();
  // const cur_year = date.getFullYear();
  // console.log(`MONTH: ${JSON.stringify(cur_month)}`)
  console.log(`MONTH/DATE/YEAR = ${mm}/${dd}/${yyyy}`)
  const url = `https://www.basketball-reference.com/friv/standings.fcgi?month=${mm}&day=${dd}&year=${yyyy}`
  const { data } = await axios.get(url); 
  const $ = cheerio.load(data);

  let actualEastStandings = null;
  let actualWestStandings = null;
  actualEastStandings = $('table#standings_e');
  actualEastStandings = parseHTMLStandings(JSON.stringify(actualEastStandings.html()))
  // console.log("SCRAPE RESULTS")
  // console.log(`-----ACTUAL EAST STANDINGS-----`)
  // console.log(actualEastStandings.html());
  // console.log(`STRING OF EAST STANDINGS`)
  // console.log(JSON.stringify(actualEastStandings.html()));
  actualWestStandings = $('table#standings_w');
  actualWestStandings = parseHTMLStandings(JSON.stringify(actualWestStandings.html()))
  console.log(`actualWestStandings = ${actualWestStandings}`)
  // console.log(`-----ACTUAL WEST STANDINGS-----`)
  // console.log(actualWestStandings.html());
  const actualStandings = {actualWestStandings, actualEastStandings}
  return actualStandings;
  {/* <ConferenceTable west_teams={west_standings} east_teams={east_standings} league_id="actual"><ConferenceTable/>; */}
}

function parseHTMLStandings(htmlStandings){
  let parsedStandings = [];
  const standingsTableStartIndex = htmlStandings.indexOf("full_table")
  let i = standingsTableStartIndex;
  let teamsFound = 0;
  while (i < htmlStandings.length && teamsFound < 15){
    let teamBoundaryIndex = htmlStandings.indexOf("<a href", i);
    let teamNameStartIndex = teamBoundaryIndex + 33; //31 is just the number of characters between the start of the <a href> element and the beginning of team names
    let teamNameEndIndex = htmlStandings.indexOf("</a>", teamNameStartIndex)
    let teamName = htmlStandings.slice(teamNameStartIndex, teamNameEndIndex)
    parsedStandings.push(teamName)
    i = teamNameEndIndex + 1;
    teamsFound += 1;
  }
  // console.log(`parsed Standings = ${JSON.stringify(parsedStandings)}`)
  console.log(`parsed Standings = ${parsedStandings}`)
  console.log(`typeof parsedStandings = ${typeof parsedStandings}`)
  return parsedStandings;

}




const westStandings = [];
const eastStandings = [];
let newStandingPrediction = null;

const teams = {ATLANTA_HAWKS: {
  name: "Atlanta Hawks",
  logo: "https://www.example.com/hawks-logo.png",
  primaryColor: "#E03A3E",
  secondaryColor: "#C1D32F"
},
BOSTON_CELTICS: {
  name: "Boston Celtics",
  logo: "https://www.example.com/celtics-logo.png",
  primaryColor: "#007A33",
  secondaryColor: "#BA9653"
},
BROOKLYN_NETS: {
  name: "Brooklyn Nets",
  logo: "https://www.example.com/nets-logo.png",
  primaryColor: "#000000",
  secondaryColor: "#FFFFFF"
},
CHARLOTTE_HORNETS: {
  name: "Charlotte Hornets",
  logo: "https://www.example.com/hornets-logo.png",
  primaryColor: "#1D1160",
  secondaryColor: "#00788C"
},
CHICAGO_BULLS: {
  name: "Chicago Bulls",
  logo: "https://www.example.com/bulls-logo.png",
  primaryColor: "#CE1141",
  secondaryColor: "#000000"
},
CLEVELAND_CAVALIERS: {
  name: "Cleveland Cavaliers",
  logo: "https://www.example.com/cavaliers-logo.png",
  primaryColor: "#860038",
  secondaryColor: "#041E42"
},
DALLAS_MAVERICKS: {
  name: "Dallas Mavericks",
  logo: "https://www.example.com/mavericks-logo.png",
  primaryColor: "#00538C",
  secondaryColor: "#0072CE"
},
DENVER_NUGGETS: {
  name: "Denver Nuggets",
  logo: "https://www.example.com/nuggets-logo.png",
  primaryColor: "#0E2240",
  secondaryColor: "#FEC524"
},
DETROIT_PISTONS: {
  name: "Detroit Pistons",
  logo: "https://www.example.com/pistons-logo.png",
  primaryColor: "#C8102E",
  secondaryColor: "#1D42BA"
},
GOLDEN_STATE_WARRIORS: {
  name: "Golden State Warriors",
  logo: "https://www.example.com/warriors-logo.png",
  primaryColor: "#006BB6",
  secondaryColor: "#FDB927"
},
HOUSTON_ROCKETS: {
  name: "Houston Rockets",
  logo: "https://www.example.com/rockets-logo.png",
  primaryColor: "#CE1141",
  secondaryColor: "#000000"
},
INDIANA_PACERS: {
name: "Indiana Pacers",
logo: "https://www.example.com/pacers-logo.png",
primaryColor: "#002D62",
secondaryColor: "#FDBB30"
},
LOS_ANGELES_CLIPPERS: {
name: "Los Angeles Clippers",
logo: "https://www.example.com/clippers-logo.png",
primaryColor: "#C8102E",
secondaryColor: "#1D42BA"
},
LOS_ANGELES_LAKERS: {
name: "Los Angeles Lakers",
logo: "https://www.example.com/lakers-logo.png",
primaryColor: "#552583",
secondaryColor: "#FDB927"
},
MEMPHIS_GRIZZLIES: {
name: "Memphis Grizzlies",
logo: "https://www.example.com/grizzlies-logo.png",
primaryColor: "#5D76A9",
secondaryColor: "#12173F"
},
MIAMI_HEAT: {
name: "Miami Heat",
logo: "https://www.example.com/heat-logo.png",
primaryColor: "#98002E",
secondaryColor: "#F9A01B"
},
MILWAUKEE_BUCKS: {
name: "Milwaukee Bucks",
logo: "https://www.example.com/bucks-logo.png",
primaryColor: "#00471B",
secondaryColor: "#EEE1C6"
},
MINNESOTA_TIMBERWOLVES: {
name: "Minnesota Timberwolves",
logo: "https://www.example.com/timberwolves-logo.png",
primaryColor: "#0C2340",
secondaryColor: "#236192"
},
NEW_ORLEANS_PELICANS: {
name: "New Orleans Pelicans",
logo: "https://www.example.com/pelicans-logo.png",
primaryColor: "#0C2340",
secondaryColor: "#85714D"
},
NEW_YORK_KNICKS: {
name: "New York Knicks",
logo: "https://www.example.com/knicks-logo.png",
primaryColor: "#006BB6",
secondaryColor: "#F58426"
},
OKLAHOMA_CITY_THUNDER: {
name: "Oklahoma City Thunder",
logo: "https://www.example.com/thunder-logo.png",
primaryColor: "#007AC1",
secondaryColor: "#EF3B24"
},
ORLANDO_MAGIC: {
name: "Orlando Magic",
logo: "https://www.example.com/magic-logo.png",
primaryColor: "#0077C9",
secondaryColor: "#C4CED4"
},
INDIANA_PACERS: {
name: "Indiana Pacers",
logo: "https://www.example.com/pacers-logo.png",
primaryColor: "#002D62",
secondaryColor: "#FDBB30"
},
LOS_ANGELES_CLIPPERS: {
name: "Los Angeles Clippers",
logo: "https://www.example.com/clippers-logo.png",
primaryColor: "#C8102E",
secondaryColor: "#1D42BA"
},
LOS_ANGELES_LAKERS: {
name: "Los Angeles Lakers",
logo: "https://www.example.com/lakers-logo.png",
primaryColor: "#552583",
secondaryColor: "#FDB927"
},
MEMPHIS_GRIZZLIES: {
name: "Memphis Grizzlies",
logo: "https://www.example.com/grizzlies-logo.png",
primaryColor: "#5D76A9",
secondaryColor: "#12173F"
},
MIAMI_HEAT: {
name: "Miami Heat",
logo: "https://www.example.com/heat-logo.png",
primaryColor: "#98002E",
secondaryColor: "#F9A01B"
},
MILWAUKEE_BUCKS: {
name: "Milwaukee Bucks",
logo: "https://www.example.com/bucks-logo.png",
primaryColor: "#00471B",
secondaryColor: "#EEE1C6"
},
MINNESOTA_TIMBERWOLVES: {
name: "Minnesota Timberwolves",
logo: "https://www.example.com/timberwolves-logo.png",
primaryColor: "#0C2340",
secondaryColor: "#236192"
},
NEW_ORLEANS_PELICANS: {
name: "New Orleans Pelicans",
logo: "https://www.example.com/pelicans-logo.png",
primaryColor: "#0C2340",
secondaryColor: "#85714D"
},
NEW_YORK_KNICKS: {
name: "New York Knicks",
logo: "https://www.example.com/knicks-logo.png",
primaryColor: "#006BB6",
secondaryColor: "#F58426"
},
OKLAHOMA_CITY_THUNDER: {
name: "Oklahoma City Thunder",
logo: "https://www.example.com/thunder-logo.png",
primaryColor: "#007AC1",
secondaryColor: "#EF3B24"
},
ORLANDO_MAGIC: {
name: "Orlando Magic",
logo: "https://www.example.com/magic-logo.png",
primaryColor: "#0077C9",
secondaryColor: "#C4CED4"
},
PHILADELPHIA_76ERS: {
name: "Philadelphia 76ers",
logo: "https://www.example.com/76ers-logo.png",
primaryColor: "#006BB6",
secondaryColor: "#ED174C"
},
PHOENIX_SUNS: {
name: "Phoenix Suns",
logo: "https://www.example.com/suns-logo.png",
primaryColor: "#1D1160",
secondaryColor: "#E56020"
},
PORTLAND_TRAIL_BLAZERS: {
name: "Portland Trail Blazers",
logo: "https://www.example.com/trailblazers-logo.png",
primaryColor: "#E03A3E",
secondaryColor: "#000000"
},
SACRAMENTO_KINGS: {
name: "Sacramento Kings",
logo: "https://www.example.com/kings-logo.png",
primaryColor: "#5A2D81",
secondaryColor: "#63727A"
},
SAN_ANTONIO_SPURS: {
name: "San Antonio Spurs",
logo: "https://www.example.com/spurs-logo.png",
primaryColor: "#B6BFBF",
secondaryColor: "#000000"
},
TORONTO_RAPTORS: {
name: "Toronto Raptors",
logo: "https://www.example.com/raptors-logo.png",
primaryColor: "#CE1141",
secondaryColor: "#000000"
},
UTAH_JAZZ: {
name: "Utah Jazz",
logo: "https://www.example.com/jazz-logo.png",
primaryColor: "#002B5C",
secondaryColor: "#F9A01B"
},
WASHINGTON_WIZARDS: {
name: "Washington Wizards",
logo: "https://www.example.com/wizards-logo.png",
primaryColor: "#E31837",
secondaryColor: "#002B5C"
}}
const sample_western_standings = [
  teams.DALLAS_MAVERICKS,
  teams.DENVER_NUGGETS,
  teams.GOLDEN_STATE_WARRIORS,
  teams.HOUSTON_ROCKETS,
  teams.LOS_ANGELES_CLIPPERS,
  teams.LOS_ANGELES_LAKERS,
  teams.MEMPHIS_GRIZZLIES,
  teams.MINNESOTA_TIMBERWOLVES,
  teams.NEW_ORLEANS_PELICANS,
  teams.OKLAHOMA_CITY_THUNDER,
  teams.PHOENIX_SUNS,
  teams.PORTLAND_TRAIL_BLAZERS,
  teams.SACRAMENTO_KINGS,
  teams.SAN_ANTONIO_SPURS,
  teams.UTAH_JAZZ
];
const sample_eastern_standings = [
  teams.ATLANTA_HAWKS,
  teams.BOSTON_CELTICS,
  teams.BROOKLYN_NETS,
  teams.CHARLOTTE_HORNETS,
  teams.CHICAGO_BULLS,
  teams.CLEVELAND_CAVALIERS,
  teams.DETROIT_PISTONS,
  teams.INDIANA_PACERS,
  teams.MIAMI_HEAT,
  teams.MILWAUKEE_BUCKS,
  teams.NEW_YORK_KNICKS,
  teams.ORLANDO_MAGIC,
  teams.PHILADELPHIA_76ERS,
  teams.TORONTO_RAPTORS,
  teams.WASHINGTON_WIZARDS
];

router.get("/actualStanding", (req, res) => {
  console.log(`Scraping the actual standings`)
  // const actualScrapedStandings = scrape();
  scrape().then((scrapedResults) => {
    const actualScrapedStandings = scrapedResults;
    // console.log(`actualScrapedStandings = ${JSON.stringify(actualScrapedStandings)}`)
    console.log(`actualScrapedStandings = ${actualScrapedStandings.actualWestStandings}`) 
    const actualStandings = new ActualStanding({
      west_predictions: actualScrapedStandings.actualWestStandings,
      east_predictions: actualScrapedStandings.actualEastStandings,
    })
    console.log("GOT ACTUALSTANDINGS")
    res.send(actualStandings);
  })
});

router.get("/standingprediction", (req, res) => {
  console.log(`Req input for get standingpreds: ${req.query.user_id}`);

  StandingPrediction.findOne({user_id: req.query.user_id}).then((standingPrediction) => {
    res.send(standingPrediction)
  })

});

router.post("/standingprediction", (req, res) => {
  // console.log(`Received a standing prediction from ${req.body.user_id}`);
  // console.log(`req.body west predictions = ${JSON.stringify(req.body.west_predictions)}`)
  // console.log(`Req = ${req}`);
  const filter = { user_id: req.body.user_id }
  const incomingPrediction = new StandingPrediction({
    user_id: req.body.user_id,
    west_predictions: req.body.west_predictions,
    east_predictions: req.body.east_predictions,
  })

  StandingPrediction.findOneAndUpdate({user_id: req.body.user_id}, {$set: {west_predictions: req.body.west_predictions, east_predictions: req.body.east_predictions}}, {new: true, upsert: true}, (err, standingPrediction) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating/creating standingPrediction");
    }
    return res.status(200).send(standingPrediction);
    });

  // StandingPrediction.findOneAndUpdate(filter, incomingPrediction, {new: true}, {useFindAndModify: false}).then((standingPrediction) => {
  //   // console.log(`type of standingPrediction.wp is ${typeof standingPrediction.west_predictions}`)
  //   // standingPrediction.west_predictions = req.body.west_predictions;
  //   // standingPrediction.east_predictions = req.body.east_predictions;
  //   // standingPrediction.save().then((standingPrediction) => res.send(standingPrediction));
  //   incomingPrediction.save().then((incomingPrediction) => res.send(incomingPrediction));
  // });






  // StandingPrediction.exists({user_id: req.body.user_id}, function(err, result){
  //   if (err){
  //     console.log(`No Prediction exists`)
  //   } else {
  //     console.log(`A prediction exists!`)
  //   }
  // })
  // // If no prediction exists for the given user yet, make a new one. Otherwise, update an existing one.
  // StandingPrediction.exists({user_id: req.body.user_id}, function(err, result){
    // if (err){
    //   const newStandingPrediction = new StandingPrediction({
    //     user_id: req.body.user_id,
    //     west_predictions: req.body.west_predictions,
    //     east_predictions: req.body.east_predictions,
    //   });
    //   newStandingPrediction.save().then((standingPrediction) => res.send(standingPrediction));
    // } else {
    //   console.log(`Result type: ${typeof result}`)
    //   console.log(`Result wp: ${JSON.stringify(result.west_predictions)}`)

    //   result.west_predictions = req.body.west_predictions;
    //   result.east_predictions = req.body.east_predictions;
    //   result.save().then((result) => res.send(result));
      // StandingPrediction.findOne({user_id: req.body.user_id}).then((standingPrediction) => {
      //   console.log(`type of standingPrediction.wp is ${JSON.stringify(standingPrediction)}`)
      //   standingPrediction.west_predictions = req.body.west_predictions;
      //   standingPrediction.east_predictions = req.body.east_predictions;
      //   standingPrediction.save().then((standingPrediction) => res.send(standingPrediction));
      // })
    // }});

  // if (predictionAlreadyExists){
    // StandingPrediction.findOne({user_id: req.body.user_id}).then((standingPrediction) => {
    //   console.log(`type of standingPrediction.wp is ${typeof standingPrediction.west_predictions}`)
    //   standingPrediction.west_predictions = req.body.west_predictions;
    //   standingPrediction.east_predictions = req.body.east_predictions;
    //   standingPrediction.save().then((standingPrediction) => res.send(standingPrediction));
    // });
  // } else {
  //   const newStandingPrediction = new StandingPrediction({
  //     user_id: req.body.user_id,
  //     west_predictions: req.body.west_predictions,
  //     east_predictions: req.body.east_predictions,
  //   });
  // }


  
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
