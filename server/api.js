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
const League = require("./models/league");


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
const { json } = require("express");



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
]

router.get("/userLeagues", auth.ensureLoggedIn, (req, res) => {
  //return all leagues that have user's user_id in them
  // filter = {user_id: req.body.user_id}
  console.log(`entered GET userLeagues. user_id = ${req.query.user_id}`)

  League.find({}).then((leagues) => {
    let userLeagues = [];
    leagues.map((league, index) => {
      console.log(`~~~ updateScoreInLeague league_name = ${league.league_name}`)
      // first check if user_id is part of league ids
      // var allLeagueUserIds = [];
      // let userIdIndex;
      for (let i = 0; i < league.users.length; i++){
        // allLeagueUserIds.push(league.users[i].user_id)
        console.log(`League user = ${league.users[i]}`)
        if (league.users[i].user_id === req.query.user_id){
          console.log(`${league.users[i].user_id} = ${req.query.user_id}!`)
          // userIdIndex = i;
          userLeagues.push(league);
        }
      }
    })
    console.log(`userLeagues at end of GET = ${JSON.stringify(userLeagues)}`)
    res.send(userLeagues);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
  
  // League.find({ users: { $in: [req.query.user_id] } })
  //   .then((leagues) => {
  //     console.log(`Entered then!`)
  //     res.send(leagues);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.post("/createLeague", auth.ensureLoggedIn, (req, res) => {
  const filter = {league_name: req.body.league_name, league_type: req.body.league_type}
  const leagueObj = new League({
    creator_id: req.body.user_id,
    league_name: req.body.league_name,
    league_password: req.body.league_password,
    league_type: req.body.league_type,
    users: req.body.users,
  });

  League.findOne(filter).then((foundLeague)=> {
    if (!foundLeague){
      leagueObj.save().then((league) => {res.send(league)})
      console.log(`Saved the input league!`)
    } else{
      console.log(`League of this name already exists`)
      res.send({ status: 0, message: "A league with that name already exists!" });
    }
  }).catch((err) =>{
    res.status(500).send(error);
  });
});

router.post("/updateScoreInLeague", auth.ensureLoggedIn, (req, res) => {
  console.log(`~~~ updateScoreInLeague user_id = ${req.body.user_id}; user_score = ${req.body.user_score}`)
  League.find({}).then((leagues) => {
    let promises = [];
    leagues.map((league, index) => {
      console.log(`~~~ updateScoreInLeague league_name = ${league.league_name}`)
      // first check if user_id is part of league ids
      var allLeagueUserIds = [];
      let userIdIndex;
      for (let i = 0; i < league.users.length; i++){
        allLeagueUserIds.push(league.users[i].user_id)
        if (league.users[i].user_id === req.body.user_id){
          console.log(`${league.users[i].user_id} = ${req.body.user_id}!`)
          userIdIndex = i;
        }
      }

      if (allLeagueUserIds.includes(req.body.user_id)) {
        console.log(`~~~ updateScoreInLeague user_id is in this league`)
        // let userIdIndex = league.users.indexOf(req.body.user_id);
        console.log(`~~~ updateScoreInLeague index of user in users array = ${userIdIndex}`)
        console.log(`~~~ updateScoreInLeague user score currently stored in array = ${league.users[userIdIndex].user_score}`)
        league.users[userIdIndex].user_score = req.body.user_score;
        promises.push(league.save());
      }
    })
    Promise.all(promises).then((result) => res.send(result));
  })

})

router.post("/addToLeague", auth.ensureLoggedIn, (req, res) => {
  //necessary info:
  // league_name, league_password, user_id
  const filter = {league_name: req.body.league_name, league_password: req.body.league_password}
  console.log(`entered POST addToLeague. filter=${JSON.stringify(filter)}`)
  League.findOne(filter).then((foundLeague) => {
    console.log(`Entered findOne`)
    console.log(`foundLeague=${JSON.stringify(foundLeague)}`)
    if(!foundLeague){
      console.log(`Didnt find league`)
      res.status(404).send('League with that name not found');
    } else if (foundLeague.users.includes(req.body.user_id)) {
      console.log(`User in league`)
      res.status(404).send('You have already joined that league!');
    } else {
      console.log(`Found league; user not in it`)
      const user = {user_id: req.body.user_id, user_score: req.body.user_score}
      League.findOneAndUpdate(filter, { $push: { users: user } }, { new: true })
      .then((updatedLeague) => {
        console.log(`Adding to league!`)
        res.status(200).send(updatedLeague); 
      })
      .catch((error) => {
        res.status(500).send(error);
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  })
});

function sortLeagueStandings(users){
  users.sort((a, b) => b.user_score - a.user_score)
  return users
}

router.get("/leagueStandings", (req, res) => {
  //nec info:
  //league_name
  console.log(`get leagueStandings input name = ${req.query.league_name}`)
  const filter = { league_name: req.query.league_name, }
  League.findOne(filter).then((foundLeague) => {
    if(!foundLeague){
      console.log(`Didnt find league`)
      res.status(404).send('League with that name not found');
    } else {
      var users = foundLeague.users;
      users = sortLeagueStandings(users) 
      res.status(200).send(users)      
    }    
  }).catch((error) => {
    res.status(500).send(error);
  })

});

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
    score: req.body.score,
  })

  StandingPrediction.findOneAndUpdate({user_id: req.body.user_id}, {$set: {west_predictions: req.body.west_predictions, east_predictions: req.body.east_predictions, score: req.body.score}}, {new: true, upsert: true}, (err, standingPrediction) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating/creating standingPrediction");
    }
    return res.status(200).send(standingPrediction);
  });
});


//----------END My API Methods------------------

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
