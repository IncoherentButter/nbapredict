import { get } from "../../utilities.js";
import React, { useState, useEffect } from "react";
import Standing from "./Standing.js";

import "./ConferenceTable.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {[Teams]} west_teams
 * @param {[Teams]} east_teams
 * @param {string} user_id
 * @param {boolean} is_editable
 * @param {(String, [Object], [Object], boolean => ())} setUserStandings
 */


const ConferenceTable = (props) => {
    //states to hold our standings
    const [westStanding, setWestStanding] = useState([]);
    const [eastStanding, setEastStanding] = useState([]);
    
    //GET call to retrieve standings
    // useEffect(() => {
    //     get("/api/standingprediction").then((westStandings, eastStandings) => {
    //         setWestStanding(westStandings);
    //         setEastStanding(eastStandings);
    //     });
    // }, []);  

    
    return ( 
        <div className="ConferenceTable-container">
            <p>
                <Standing user_id={props.user_id} teams={props.west_teams} is_editable={props.is_editable} setUserStandings={props.setUserStandings} is_west={true}/>
            </p>
            <p>
                <Standing user_id={props.user_id} teams={props.east_teams} is_editable={props.is_editable} setUserStandings={props.setUserStandings} is_west={false}/>
            </p>
        </div>
        // <Table>
        //     <thead className="thead-dark">
        //         <tr>
        //             <th scope="col">West</th>
        //             <th scope="col">East</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr key={props.league_id}>
        //             <td>
        //                 <Standing league_id={props.league_id} teams={props.west_teams}></Standing>
        //             </td>
        //             <td>
        //                 <Standing league_id={props.league_id} teams={props.east_teams}></Standing>
        //             </td>
        //         </tr>
        //     </tbody>
        // </Table> 
    )
};

export default ConferenceTable;