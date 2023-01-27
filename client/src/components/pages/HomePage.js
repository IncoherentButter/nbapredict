import React, { useEffect, useState } from "react";
import { socket } from "../../client-socket.js";
import ConferenceTable from "../modules/ConferenceTable.js";
import Teams from "../../team-enums.js";
import SampleStandings from "../../team-enums.js";
import { post } from "../../utilities";
import { get } from "../../utilities"

import "./HomePage.css";


/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} user_id id of current logged in user
 */
const HomePage = (props) => {
  const [activeUsers, setActiveUsers] = useState([]);

  
  // const [activeChat, setActiveChat] = useState({
  //   recipient: ALL_CHAT,
  //   messages: [],
  // });
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
    get("/api/standingprediction", { user_id: props.user_id}).then((standingPrediction) => {
        const westStandings = standingPrediction.west_predictions;
        const eastStandings = standingPrediction.east_predictions;
        // const firstTeam = westStandings[0];
        console.log(`GET RES westernStandings team 1 = ${typeof westStandings}`)
        if (westStandings != undefined){
          setWesternStandings(westStandings);
        }
        if (eastStandings != undefined){
          setEasternStandings(eastStandings);
        }
    });
  }, []); 

  const handlePredictionSubmit = (event) => {
    event.preventDefault();
    const newStandingPrediction = {user_id: props.userId, west_predictions: westernStandings, east_predictions: easternStandings};
    // console.log(`PRE-POST westernStandings team 1 = ${westernStandings[0].name}`)
    post("/api/standingprediction", newStandingPrediction).then((prediction) => {
      // setScore(res.score);
      if (westernStandings != undefined){
        const firstTeam = westernStandings[0];
        if (firstTeam != undefined){
          console.log(`POST RES westernStandings team 1 = ${firstTeam.name}`)
        }
      }
      console.log("POST standingprediction went through!")
    })
  }

  console.log("----TYPE OF WEST STANDING");
  console.log(typeof westernStandings);
  console.log(westernStandings);

  let conferenceTable = {westernStandings, easternStandings};
  let changedConferenceTable = false;


  //------SUBMIT BUTTON-------
  const [score, setScore] = useState(0);
  let scoreButton = null;
  let submitButton = null;
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
  //-------------------------
  // useEffect(() => {
  //   get("/api/standingprediction", { user_id: props.userId, west_predictions: westernStandings, east_predictions: easternStandings }).then((score) =>{
  //     setScore(res.score);
  //   });
  // }, []);
  scoreButton = (
    <div>
      <button
      className="button-76"
      onClick={()=>{console.log(Click)}}>
        Score={score}
      </button>
    </div>
  );




  // useEffect(() => {
  //   const score = get("/api/standingprediction", { user_id: user.userId, west_predictions: westernStandings, east_predictions: easternStandings });
  //   setScore(score);

  // }, submitButton);
  // let scoreButton = (
  //   <div>
  //     <button
  //     className="button-49">
  //       {score}
  //     </button>
  //   </div>
  //   )


  // const loadMessageHistory = (recipient) => {
  //   get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
  //     setActiveChat({
  //       recipient: recipient,
  //       messages: messages,
  //     });
  //   });
  // };
  // get("/api/standingprediction", { user_id: props.userId, west_predictions: westernStandings, east_predictions: easternStandings })
  // if (props.user_id && )


  //--------------------
  
  //------method that updates user predictions LOCALLY (Submit button sends POST req)
  const setUserStandings = (user, tempWestStandings, tempEastStandings, isWest) => {
    if (!user.userId){
      return;
    }
    if (isWest){
      setWesternStandings(tempWestStandings);
    } else {
      setEasternStandings(tempEastStandings);
    }
  };


  // When conferenceTable changes, we
  // useEffect(() => {

  // }, changedConferenceTable);



  //-----------Get user's predictions and post them----
  // 
  // useEffect(() => {
  //   get("/api/standingprediction", { user_id: user.userId }).then((westernStandings) => {
  //     setWesternStandings();
  //   });
  // }, []);


  // useEffect(() => {
  //   document.title = "NBAPredict";
  // }, []);

  
  // const dayInMilliseconds = 1000 * 60 * 60 * 24;
  // setInterval(scrape(),dayInMilliseconds );  

  if (!props.user_id) {
    return <div>Log in before using NBAPredict</div>;
  }
  return (
    <>
      <div className="HomePage-container">
        {/*CreateLeagueButton*/}
        {/*JoinLeagueButton*/}
        {/*YourLeaguesButton*/}
        {/* {console.log("TYPE OF SAMPLE STANDINGS")}
        {console.log(typeof(sample_western_standings))} */}
        {/* <p><ConferenceTable is_editable={true} west_teams={westernStandings} east_teams={easternStandings} league_id={user.userId}/></p> */}
        <div>
          <ConferenceTable is_editable={true} west_teams={westernStandings} east_teams={easternStandings} user_id={props.user_id} setUserStandings={setUserStandings}/>
        </div>
        <div className="HomePage-Submit-button">{submitButton}</div>
        <div>
          <ConferenceTable is_editable={false} west_teams={sample_western_standings} east_teams={sample_eastern_standings} user_id={props.user_id} setUserStandings={setUserStandings}/>
        </div>
        {/* <div className="HomePage-Submit-button Disabed">{scoreButton}</div> */}
      </div>
      <div>
        <span className="HomePage-Score-button Disabed">{scoreButton}</span>
      </div>
    </>
  );
}

export default HomePage;
