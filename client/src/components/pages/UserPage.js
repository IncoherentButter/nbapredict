import React, { useEffect, useState } from "react";
import { socket } from "../../client-socket.js";
import ConferenceTable from "../modules/ConferenceTable.js";
import Teams from "../../team-enums.js";
import SampleStandings from "../../team-enums.js";
import { post } from "../../utilities";
import { get } from "../../utilities"
import getSumOfSquareDistances from "../../ranking-logic"

import "./UserPage.css";



/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} user_id id of current logged in user
 */

const UserPage = (props) => {
  const [activeUsers, setActiveUsers] = useState([]);

  let teamAbbreviations = ["ATL", "BKN", "BOS", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"];
  let teamLogoElements = [];
  for (let i = 0; i < teamAbbreviations.length; i++) {
    let teamAbbr = teamAbbreviations[i];
    let teamLogo = document.createElement(`NBAIcons.${teamAbbr}`);
    teamLogo.setAttribute("size", 25);
    teamLogoElements.push(teamLogo);
    
    // You can add here other attributes to the element
    // append the element to some parent element or do something else with it
  }
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

  // initialize useState for Western and Eastern standings
  const [westernStandings, setWesternStandings] = useState(
    sample_western_standings
  );

  const [easternStandings, setEasternStandings] = useState(
    sample_eastern_standings
  );
  

  //------Update standings if possible-------
  useEffect(() => {
    if (props.user_id) {
      get("/api/standingprediction", { user_id: props.user_id }).then((standingPrediction) => {      
          const westStandings = standingPrediction.west_predictions;
          const eastStandings = standingPrediction.east_predictions;
          // console.log(`GET RES westernStandings team 1 = ${typeof westStandings}`)
          if (westStandings != undefined){
            console.log(`DEFINED GET RES westernStandings team 1 = ${westStandings[0].name}`)
            setWesternStandings(westStandings);
            setUserStandings(props.user_id, westStandings, null, true);
          } else{console.log(`westStandings UNDEFINED`)}
          if (eastStandings != undefined){
            setEasternStandings(eastStandings);
            setUserStandings(props.user_id, null, eastStandings, false);
          }
      })
      console.log(`Finished GET Standingprediction`)
    }
  }, [props.user_id]);
  
  


  const handlePredictionSubmit = (event) => {
    event.preventDefault();
    const newStandingPrediction = {user_id: props.user_id, west_predictions: westernStandings, east_predictions: easternStandings};
    // console.log(`handlePredictionSubmit: newStandings = ${JSON.stringify(newStandingPrediction)}`)
    // console.log(`req.body user_id = ${props.user_id}`);
    newStandingPrediction.west_predictions.forEach((team, index) => {
      console.log(`Team at index=${index} is ${team.name}`);
    })  
    post("/api/standingprediction", newStandingPrediction).then((prediction) => {
      // setScore(res.score);
      if (westernStandings != undefined){
        const firstTeam = prediction.west_predictions[0];
        if (firstTeam != undefined){
          console.log(`POST RES westernStandings team 1 = ${firstTeam.name}`)
        }
      }
      console.log("POST standingprediction went through!")
      const west_score = getSumOfSquareDistances(newStandingPrediction.west_predictions, sample_western_standings);
      const east_score = getSumOfSquareDistances(newStandingPrediction.east_predictions, sample_eastern_standings);
      const total_score = west_score + east_score;
      setScore(total_score);

    })
  }

  //------BUTTONS-------
  const [score, setScore] = useState(0);
  let scoreButton = null;
  let submitButton = null;
  let CreateLeagueButton = null;
  let JoinLeagueButton = null;
  let ViewLeagueButton = null;
  if (props.user_id) {
    submitButton = (
      <div>
        <button
          className="button-71"
          onClick={handlePredictionSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
  scoreButton = (
    <div>
      <button
      className="button-76"
      onClick={()=>{console.log(Click)}}>
        Score={score}
      </button>
    </div>
  );
  CreateLeagueButton = (
    <div>
      <button
      className="button-72"
      onClick={()=>{console.log("create league clicked")}}
      >CreateLeague</button>
    </div>
  );
  JoinLeagueButton = (
    <div>
      <button
      className="button-72"
      onClick={()=>{console.log("join league clicked")}}
      >Join League</button>
    </div>
  );
  ViewLeagueButton = (
    <div>
      <button
      className="button-72"
      onClick={()=>{console.log("view league clicked")}}
      >View Your Leagues</button>
    </div>
  );
//-------------------------



  //--------------------
  
  //------method that updates user predictions LOCALLY 
  const setUserStandings = (user, tempWestStandings, tempEastStandings, isWest) => {
    if (user !== props.user_id){
      console.log(`Ids dont match!`)
      console.log(`user parameter = ${user}, user prop is ${props.user_id}`)
      return;
    }
    if (isWest){
      console.log(`Is west, updating standings!`)
      console.log(`setUserStandings parameter West team 1 = ${tempWestStandings[0].name}`)
      setWesternStandings(tempWestStandings);
      console.log(`setUserStandings updated West team 1 = ${westernStandings[0].name}`)
    } else {
      console.log(`Is east, updating standings!`)
      setEasternStandings(tempEastStandings);
    }
  }; 

  useEffect(() => {
    console.log(`TRACKING westernStandings = ${JSON.stringify(westernStandings)}`)
  }, [westernStandings, easternStandings])

  if (!props.user_id) {
    return <div>Log in before using NBAPredict</div>;
  }
  return (
    <>
      <div className="UserPage-container">
        <div>
          <ConferenceTable is_editable={true} west_teams={westernStandings} east_teams={easternStandings} user_id={props.user_id} setUserStandings={setUserStandings}/>
        </div>
        <div className="UserPage-Submit-button">{submitButton}</div>
        <div>
          <ConferenceTable is_editable={false} west_teams={sample_western_standings} east_teams={sample_eastern_standings} user_id={props.user_id} setUserStandings={setUserStandings}/>
        </div>
      </div>
      <div>
        <span className="UserPage-Score-button Disabed">{scoreButton}</span>
      </div>
      {/* <div className="UserPage-Create-button">{CreateLeagueButton}</div> */}
      {/* <div className="UserPage-Join-button">{JoinLeagueButton}</div> */}
      {/* <div className="UserPage-View-button">{ViewLeagueButton}</div> */}
    </>
  );
}

export default UserPage;
