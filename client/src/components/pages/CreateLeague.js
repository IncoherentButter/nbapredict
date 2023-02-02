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
 * @param {string} user_name name of current logged in user
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
      league_password: leaguePassword, league_type: "Standings", users: [{user_id: props.user_id, user_name: props.user_name, user_score: userScore}]};

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

  const LeagueCard = (props) => {
    return(
      <div>
        <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
          <img class="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
        </div>
    </div>
    )
    
  }
  
 
  if (!props.user_id) {
    return <div>Log in before using NBAPredict</div>;
  }
  return (
      <div className="CreateLeague-Container">
          {/* <div className="CreateLeague-Header">
            <div>League Creation Menu</div>
          </div> */}
          <div className="CreateLeague-InputContainer">
            <input
            type="text"
            placeholder={props.defaultLeagueNameText}
            value={leagueUsername}
            onChange={handleLeagueNameChange}
            className="CreateLeague-NameForm" 
            /> 
            <button
            type="submit"
            className="CreateLeague-StandingsButton"
            value="Submit"
            
            onClick={handleCreateSubmit}>
            Create
            </button>
            <hr className="CreateLeague-HorizontalLine" color="black" width="100%" size="15"/>
            <input
            type="text"
            placeholder={props.defaultLeaguePasswordText}
            value={leaguePassword}
            onChange={handleLeaguePasswordChange}
            className="CreateLeague-PasswordForm" 
            />
            {/* <div className="CreateLeague-PasswordForm">
              League Password:
            </div>
            <div>
              <div className="CreateLeague-StandingsButton">
                Submit
              </div>
            </div> */}
          </div>            
      </div>
  );
}

export default CreateLeague;
