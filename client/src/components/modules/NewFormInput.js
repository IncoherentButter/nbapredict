import React, { useState } from "react";

import "./NewFormInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 * @param
 */

//params for creating/joining league: user_id; league username, league password,
const NewFormInput = (props) => {
  const [value, setValue] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [leagueUsername, setLeagueUsername] = useState('');
  const [leaguePassword, setLeaguePassword] = useState('');

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    const leagueData = { creator_id: props.user_id, league_name: leagueUsername, league_password: leaguePassword, league_type: "Standings", user_ids: [props.user_id]}
    

    props.onSubmit && props.onSubmit(value);
    setValue("");
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
      <button
        type="submit"
        className="NewFormInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewLeague = (props) => {
  const addLeagueName = (value) => {
    const body = { creator_id: props.user_id, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewLeagueName(comment);
    });
  };

  return <NewFormInput defaultText="League Username" onSubmit={addLeagueName} />;
};

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewLeaguePassword = (props) => {
  const addLeaguePassword = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewLeaguePassword(story);
    });
  };

  return <NewFormInput defaultText="League Password" onSubmit={addNewLeaguePassword} />;
};

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
// const NewMessage = (props) => {
//   const sendMessage = (value) => {
//     const body = { recipient: props.recipient, content: value };
//     post("/api/message", body);
//   };

//   return <NewFormInput defaultText="New Message" onSubmit={sendMessage} />;
// }

export { NewLeagueName, NewLeaguePassword };
