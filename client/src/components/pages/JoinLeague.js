import React, { useEffect, useState } from "react";
import { socket } from "../../client-socket.js";
import ConferenceTable from "../modules/ConferenceTable.js";
import Teams from "../../team-enums.js";
import SampleStandings from "../../team-enums.js";
import { post } from "../../utilities";
import { get } from "../../utilities"
import getSumOfSquareDistances from "../../ranking-logic"

import "./JoinLeague.css";

import * as NBAIcons from 'react-nba-logos';



/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} user_id id of current logged in user
 * @param {number} user_score score of current user
 */

const JoinLeague = (props) => {
  const [leagues, setLeagues] = useState([]);
  const [leagueUsername, setLeagueUsername] = useState('');
  const [leaguePassword, setLeaguePassword] = useState('');
  const [JoinText, setJoinText] = useState("Join");

  // called whenever the user types in the League Username box
  const handleLeagueNameChange = (event) => {
    setLeagueUsername(event.target.value);
  };
  // called whenever the user types in the League Password box
  const handleLeaguePasswordChange = (event) => {
      setLeaguePassword(event.target.value);
  };
  
  const handleJoinSubmit = (event) => {
    setJoinText("Joined!")
    event.preventDefault();
    const leagueJoinData = { user_id: props.user_id, user_score: props.user_score, league_name: leagueUsername, league_password: leaguePassword }

    // props.onSubmit && props.onSubmit(value);
    joinLeague(leagueJoinData)

    setLeagueUsername("");
    setLeaguePassword("");
  };

  const joinLeague = (leagueJoinData) => {
    console.log(`entered joinLeague`)
    console.log(`leagueJoinData = ${JSON.stringify(leagueJoinData)}`)
    // const leagueData = { creator_id: props.user_id, league_name: leagueUsername, league_password: leaguePassword, league_type: "Standings", user_ids: [props.user_id]}
    post("/api/addToLeague", leagueJoinData).then((leagueObj) => {
      // display feedback on screen that league creation was successful
      // props.addNewLeague(comment);
      console.log(`Post request for joining league went thru!`)
      console.log(`POST JoinLeague response: ${JSON.stringify(leagueObj)}`)
    });
  }

  if (!props.user_id) {
    return <div>Log in before using NBAPredict</div>;
  }
  return (
    <>
      <div className="JoinLeague-Container">
          <div className="JoinLeague-InputContainer">
            <input
            type="text"
            placeholder={props.defaultLeagueNameText}
            value={leagueUsername}
            onChange={handleLeagueNameChange}
            className="JoinLeague-NameForm" 
            /> 
            <button
            type="submit"
            className="JoinLeague-StandingsButton"
            value="Submit"
            onClick={handleJoinSubmit}>
            {JoinText}
            </button>
            <hr className="CreateLeague-HorizontalLine" color="black" width="100%" size="15"/>
            <input
            type="text"
            placeholder={props.defaultLeaguePasswordText}
            value={leaguePassword}
            onChange={handleLeaguePasswordChange}
            className="JoinLeague-PasswordForm" 
            />
          </div>            
      </div>
    </>
  );
}

export default JoinLeague;
