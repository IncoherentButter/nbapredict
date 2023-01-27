import React, { useState } from "react";

import "./NewPredictionInput.css";

/**
 * New Prediction is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} userId user id
 * @param {[Object]} west_predictions west prediction
 * @param {[Object]} east_predictions east prediction
 * @param {({westPredictions, eastPredictions}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */

const NewPredictionInput = (props) => {
    const [value, setValue] = useState([]);
    
    // called whenever the user types in the new post input box
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // called when the user hits "Submit" for their prediction
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(value);
        setValue("");
    };

    return(
        <div className="u-flex">
        <input
            type="text"
            placeholder={props.defaultText}
            value={value}
            onChange={handleChange}
            className="NewPredictionInput-input"
        />
        <button
            type="submit"
            className="NewPrediction-button u-pointer"
            value="Submit"
            onClick={handleSubmit}
        >
            Submit
        </button>
        </div>
    );


};

const NewPrediction = (props) => {
    const addPrediction = (value) => {
        const body = {user_id: props.userId, west_predictions: props.west_predictions, east_predictions: props.east_predictions};
        post("/api/standingprediction", body).then((newStandingPrediction) => {
          // display this comment on the screen
          props.addPrediction(newStandingPrediction);
        });
    };

    return <NewPredictionInput defaultText="New Prediction" onSubmit={addPrediction}/>;
};