import React, { useState } from "react";

import "./League.css";
import { post } from "../../utilities";

/**
 * League is a component that handles storing leagues, joining, and creating them
 *
 * Proptypes
 * @param {string} user_id is the placeholder text
 * @param {string} league_name optional prop, used for comments
 * @param {string} league_password
 * @param {[string]} league_user_ids
 */

const League = (props) => {
    const [leagues, setLeagues] = useState([]);
    const [leagueUsername, setLeagueUsername] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');


    
    // called whenever the user types in the League Username box
    const handleUsernameChange = (event) => {
        setLeagueUsername(event.target.value);
    };
    // called whenever the user types in the League Password box
    const handlePasswordChange = (event) => {
        setLeaguePassword(event.target.value);
    };

    // called when the user hits "Submit" to create a league
    const handleCreateSubmit = (event) => {
        event.preventDefault();
        const leagueData = { creator_id: props.user_id, league_name: leagueUsername, league_password: leaguePassword, league_type: "Standings", user_ids: [props.user_id]}
        

        props.onSubmit && props.onSubmit(value);
        setValue("");
    };

    // called when the user hits "Join" to join a league
    const handleJoinSubmit = (event) => {
        event.preventDefault();
        const leagueJoinData = {league_name: leagueUsername, leaguePassword: leaguePassword}
        

        props.onSubmit && props.onSubmit(value);
        setValue("");
    };




    const addNewLeague = (leagueObj) => {
        setLeagues(leagues.concat([leagueObj]));
    }

    const joinLeague = (leagueInfo) => {
        const leagueName = leagueInfo.league_name;
        const leaguePassword = leagueInfo.league_password;
    }

    return(
        <div>
        <div className="League-container">
            <SingleStory
            _id={props._id}
            creator_name={props.creator_name}
            creator_id={props.creator_id}
            content={props.content}
            />
            <CommentsBlock
            story={props}
            comments={comments}
            creator_id={props.creator_id}
            userId={props.userId}
            addNewComment={addNewComment}
            />
      </div>
      </div>
    )
};

const CreateLeague = (props) => {

    const addLeagueName = (value) => {
        const body = { creator_id: props.user_id, league_name: leagueUsername, league_password: leaguePassword, league_type: "Standings", user_ids: [props.user_id]}

        post("/api/createLeague", body).then((league) => {
          // display this comment on the screen
          props.addNewLeague(league);
        });
    };

    return (
        <div className="u-flex">
            <input
            type="text"
            placeholder={props.defaultText}
            value={value}
            onChange={handleChange}
            className="NewFormInput-input"
            />
            <input
            type="text"
            placeholder={props.defaultText}
            value={value}
            onChange={handleChange}
            className="NewFormInput-input"
            />
            <button
            type="submit"
            className="NewFormInput-button u-pointer"
            value="Submit"
            onClick={handleSubmit}
            >
            Submit
            </button>
        </div>
    )
};

export default League;