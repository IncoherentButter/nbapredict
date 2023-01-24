import React from "react";
import Teams from "../../team-enums.js";
import Table from "react-bootstrap/Table";

/**
 * Component to render a single NBA team's card
 * 
 * Proptypes
 * @param {string} conference_table_id
 * @param {Teams} team
 */

const TeamCard = (props) => {
    return (
        <span>
            <img src="..." class="rounded mx-auto d-block" alt="...">team.logo</img>
            <span className="TeamCard-name">team.name</span>
        </span>
    )
};

export default TeamCard;