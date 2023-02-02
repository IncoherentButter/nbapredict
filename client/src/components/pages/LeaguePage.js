import React, { useEffect, useState } from "react";
import { socket } from "../../client-socket.js";
import ConferenceTable from "../modules/ConferenceTable.js";
import Teams from "../../team-enums.js";
import SampleStandings from "../../team-enums.js";
import { post } from "../../utilities";
import { get } from "../../utilities"
import getSumOfSquareDistances from "../../ranking-logic"
import { Link } from "@reach/router";


import "./LeaguePage.css";

import * as NBAIcons from 'react-nba-logos';



/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} user_id id of current logged in user
 * @param {string} league_name name of the league being viewed
 */

const ScoreRow = (props) =>{
  // const user_name = props.user_name.concat("||| ")
  const user_score = props.user_score
  var user_name = props.user_name;
  if (!user_name){
    user_name = "Unnamed User"
  }
  const index = props.index
  return(
      <tr className="LeaguePage-Row">
          <td className=".LeaguePage-Row-Index">{index}</td>
          <td className=".LeaguePage-Row-Username">{user_name}</td>
          <td className=".LeaguePage-Row-User-Score">{user_score.toFixed(2)}</td>
      </tr>
  );
};

const LeaguePage = (props) => {
  //Credit for the NBA Logo images and associated components goes to ChirsKatsaras on Github: https://github.com/ChrisKatsaras/React-NBA-Logos
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
  primaryColor: "#123752",
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
  primaryColor: "#7a8181",
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
  const sample_actual_western_standings = [
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
  const sample_actual_eastern_standings = [
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
  
  const [actual_western_standings, setActualWesternStandings] = useState(sample_actual_western_standings);
  const [actual_eastern_standings, setActualEasternStandings] = useState(sample_actual_eastern_standings);
  const leagueLeaderboard = [];
  const [leagueStandings, setLeagueStandings] = useState(leagueLeaderboard);

  const leagueData = { league_name: props.league_name, };

  //get request here to update userLeagues
  useEffect(() => {
    get("/api/leagueStandings", leagueData).then((leagueScores) => {      
      if (leagueScores != undefined){
        setLeagueStandings(leagueScores);
      }
    })}, [props.user_id])

  
  
  function teamNameToTeamObject(teamName){
    switch(teamName){
      case "Atlanta Hawks":
        return teams.ATLANTA_HAWKS;
        break;
      case "Boston Celtics":
          return teams.BOSTON_CELTICS;
          break;
      case "Brooklyn Nets":
          return teams.BROOKLYN_NETS;
          break;
      case "Charlotte Hornets":
          return teams.CHARLOTTE_HORNETS;
          break;
      case "Chicago Bulls":
          return teams.CHICAGO_BULLS;
          break;
      case "Cleveland Cavaliers":
          return teams.CLEVELAND_CAVALIERS;
      case "Dallas Mavericks":
          return teams.DALLAS_MAVERICKS;
      case "Denver Nuggets":
          return teams.DENVER_NUGGETS
      case "Detroit Pistons":
          return teams.DETROIT_PISTONS;
      case "Golden State Warriors":
          return teams.GOLDEN_STATE_WARRIORS;
      case "Houston Rockets":
          return teams.HOUSTON_ROCKETS;
      case "Indiana Pacers":
          return teams.INDIANA_PACERS;
      case "Los Angeles Clippers":
          return teams.LOS_ANGELES_CLIPPERS;
      case "Los Angeles Lakers":
          return teams.LOS_ANGELES_LAKERS;
      case "Memphis Grizzlies":
          return teams.MEMPHIS_GRIZZLIES;
      case "Miami Heat":
          return teams.MIAMI_HEAT;
      case "Milwaukee Bucks":
          return teams.MILWAUKEE_BUCKS;
      case "Minnesota Timberwolves":
          return teams.MINNESOTA_TIMBERWOLVES;
      case "New Orleans Pelicans":
          return teams.NEW_ORLEANS_PELICANS;
      case "New York Knicks":
          return teams.NEW_YORK_KNICKS;
      case "Oklahoma City Thunder":
          return teams.OKLAHOMA_CITY_THUNDER;
      case "Orlando Magic":
          return teams.ORLANDO_MAGIC;
      case "Philadelphia 76ers":
          return teams.PHILADELPHIA_76ERS;
      case "Phoenix Suns":
          return teams.PHOENIX_SUNS;
      case "Portland Trail Blazers":
          return teams.PORTLAND_TRAIL_BLAZERS;
      case "Sacramento Kings":
          return teams.SACRAMENTO_KINGS;
      case "San Antonio Spurs":
          return teams.SAN_ANTONIO_SPURS;
      case "Toronto Raptors":
          return teams.TORONTO_RAPTORS;
      case "Utah Jazz":
          return teams.UTAH_JAZZ;
      case "Washington Wizards":
          return teams.WASHINGTON_WIZARDS;
      default:
          return teams.WASHINGTON_WIZARDS;
    }
  }
  
  useEffect(() => {
    get("/api/actualStanding").then((actualStandings) => { 
      const westStandingsString = actualStandings.west_predictions;
      const eastStandingsString = actualStandings.east_predictions;
      const actualWestStandings = [];
      const actualEastStandings = [];
      if (westStandingsString != undefined){
        for (let i = 0; i < westStandingsString.length; i++){
          actualWestStandings.push(teamNameToTeamObject(westStandingsString[i]))
        } 
        setUserStandings(props.user_id, actualWestStandings, null, true, false);
      }
      if (eastStandingsString != undefined){
        for (let i = 0; i < eastStandingsString.length; i++){
          actualEastStandings.push(teamNameToTeamObject(eastStandingsString[i]))
        } 
        setUserStandings(props.user_id, null, actualEastStandings, false, false);
      }
    })}, [])
  
  const setUserStandings = (user, tempWestStandings, tempEastStandings, isWest, is_editable) => {
    if (user !== props.user_id){
      return;
    }
    if (isWest){
      if (is_editable){
        setWesternStandings(tempWestStandings);
      } else{
        setActualWesternStandings(tempWestStandings);
      }
    } else {
      if (is_editable){
        setEasternStandings(tempEastStandings);
      } else{
        setActualEasternStandings(tempEastStandings);
      }
    }
  }; 

  if (!props.user_id) {
    return <div>Log in before using NBAPredict</div>;
  }
  return (
    <>
      <div className="LeaguePage-Container">
        <div className="LeaguePage-Navigator">
          <table className="LeaguePage-Table">
              <caption>{props.league_name} Leaderboard</caption>
              <thead>
                <tr>
                  <th scope="col" className="LeaguePage-Table-Header">Rank</th>
                  <th scope="col" className="LeaguePage-Table-Header">Username</th>
                  <th scope="col" className="LeaguePage-Table-Header">Score</th>
                </tr>
              </thead>
              <tbody>
                {leagueStandings.map((user, index) => (
                    <ScoreRow    
                        key={user.user_id}
                        user_name={user.user_name}
                        user_score={user.user_score}
                        index={index+1}
                    />
                  ))
                }
              </tbody>
          </table>
        </div>
        
        <div className="LeaguePage-ConferenceTableContainer">
            <ConferenceTable is_editable={false} west_teams={actual_western_standings} east_teams={actual_eastern_standings} user_id={props.user_id} setUserStandings={setUserStandings}/>
        </div>
      </div>
      {/* <div className="UserPage-Create-button">{YourLeaguesButton}</div> */}
    </>
  );
}

export default LeaguePage;
