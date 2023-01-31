import React, { useEffect, useState } from "react";
import { socket } from "../../client-socket.js";
import ConferenceTable from "../modules/ConferenceTable.js";
import Teams from "../../team-enums.js";
import SampleStandings from "../../team-enums.js";
import { post } from "../../utilities";
import { get } from "../../utilities"
import getSumOfSquareDistances from "../../ranking-logic"

import "./YourLeagues.css";

import * as NBAIcons from 'react-nba-logos';



/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} user_id id of current logged in user
 */

const YourLeagues = (props) => {
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
          <div className="CreateLeague-NameForm">
            League Name: 
          </div>
          <div className="CreateLeague-PasswordForm">
            League Password:
          </div>
          <div>
            <span className="CreateLeague-StandingsButton">
              Standings
            </span>
            <span className="CreateLeague-82Button">
              82 Game
            </span>
          </div>
        </div>
        {/*JoinLeagueButton*/}
        {/*YourLeaguesButton*/}
        <div>
          {/* <ConferenceTable is_editable={false} west_teams={sample_western_standings} east_teams={sample_eastern_standings} user_id={props.user_id} setUserStandings={setUserStandings}/> */}
        </div>
      </div>

      {/* <div className="UserPage-Create-button">{CreateLeagueButton}</div> */}
    </>
  );
}

export default YourLeagues;
