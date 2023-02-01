import React, { useEffect, useState } from "react";
import { socket } from "../../client-socket.js";
import ConferenceTable from "../modules/ConferenceTable.js";
import Teams from "../../team-enums.js";
import SampleStandings from "../../team-enums.js";
import { post } from "../../utilities";
import { get } from "../../utilities"
import getSumOfSquareDistances from "../../ranking-logic"

import "./CreateLeague.css";

import * as NBAIcons from 'react-nba-logos';



/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} user_id id of current logged in user
 * @param {Number} user_score score of current user's prediction
 * @param {string} defaultLeagueNameText League Name form's default text before user types in
 * @param {string} defaultLeaguePasswordText League Password form's default text before user types in 
 */

const CreateLeague = (props) => {

  const [value, setValue] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [leagueUsername, setLeagueUsername] = useState('');
  const [leaguePassword, setLeaguePassword] = useState('');
  const [userScore, setUserScore] = useState(props.user_score);

  useEffect(() => {
    setUserScore(props.user_score);
  }, [props.user_score]);

  // called whenever the user types in the League Username box
  const handleLeagueNameChange = (event) => {
    setLeagueUsername(event.target.value);
  };
  // called whenever the user types in the League Password box
  const handleLeaguePasswordChange = (event) => {
      setLeaguePassword(event.target.value);
  };

  // called when the user hits "Submit" to create a league
  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const leagueData = { creator_id: props.user_id, league_name: leagueUsername,
      league_password: leaguePassword, league_type: "Standings", users: [{user_id: props.user_id, user_score: userScore}]};

    // props.onSubmit && props.onSubmit(value);
    addLeague(leagueData)

    setLeagueUsername("");
    setLeaguePassword("");
  };
  // const addNewLeague = (leagueObj) => {
  //   setLeagues(leagues.concat([leagueObj]));
  // }

  const addLeague = (leagueData) => {
    console.log(`entered addLeague`)
    console.log(`leagueData = ${JSON.stringify(leagueData)}`)
    // const leagueData = { creator_id: props.user_id, league_name: leagueUsername, league_password: leaguePassword, league_type: "Standings", user_ids: [props.user_id]}
    post("/api/createLeague", leagueData).then((leagueObj) => {
      // display feedback on screen that league creation was successful
      // props.addNewLeague(comment);
      console.log(`Post request for adding league went thru!`)
      console.log(`POST League response: ${JSON.stringify(leagueObj)}`)
    });
  }
  if (!props.user_id) {
    return <div>Log in before using NBAPredict</div>;
  }
  return (
    <>
      <div className="CreateLeague-container">
        <div className="CreateLeague-Header">
          <div>League Creation Menu</div>
        </div>
        <div className="CreateLeague-InputContainer">
          <input
          type="text"
          placeholder={props.defaultLeagueNameText}
          value={leagueUsername}
          onChange={handleLeagueNameChange}
          className="CreateLeague-NameForm" 
          /> 
          <input
          type="text"
          placeholder={props.defaultLeaguePasswordText}
          value={leaguePassword}
          onChange={handleLeaguePasswordChange}
          className="CreateLeague-PasswordForm" 
          />
          <button
          type="submit"
          className="CreateLeague-StandingsButton"
          value="Submit"
          onClick={handleCreateSubmit}>
          Submit
          </button>
          {/* <div className="CreateLeague-PasswordForm">
            League Password:
          </div> */}
          {/* <div> */}
            {/* <div className="CreateLeague-StandingsButton">
              Submit
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default CreateLeague;
