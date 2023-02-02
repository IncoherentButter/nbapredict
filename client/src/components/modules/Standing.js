import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom'
import Teams from "../../team-enums.js";
import "./Standing.css";
import update from 'immutability-helper'

import * as NBAIcons from 'react-nba-logos';


// import styled from 'styled-components';
// import { useTable } from 'react-table';
// import HTML5Backend from 'react-dnd-html5-backend';
// import update from 'immutability-helper';

// import makeData from './makeData'
// import 'bootstrap-table/dist/bootstrap-table.js'


/**
 * Component to render an online user
 *
 * Proptypes
 * @param {string} user_id
 * @param {[Teams]} teams
 * @param {boolean} is_editable
 * @param {(String, [Object], [Object], boolean => ())} setUserStandings
 * @param {boolean} is_west
 */
const NUM_ROWS = 2;
const TEAM_ROW_TYPE = 'teamRow';

/**
 * TeamRow is a component for a row in the table
 * that contains one team.
 *
 * Proptypes
 * @param {Object} team is the team Object for the row
 * @param {int} index is the row index of the team
 * @param {{int, int} => ()} moveRow is a function that takes in drag and hover indices and moves rows
 */
const TeamRow = (props) => {
    // { team, index, moveRow }
    const team = props.team;
    const index = props.index;
    
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);
    const [, drop] = useDrop({ 
        accept: TEAM_ROW_TYPE,
        hover(item, monitor) { //hover() is called whenever you hover over component
            //---Check if we can drop---
            if (!dropRef.current){
                return
            }
            if (!monitor.canDrop()) {
                return;
            }
            //-------------------------
            //------check if we're dragging and hovering in same row------
            const dragIndex = item.index; //index the item started at
            const hoverIndex = index; //index hovering at
            if (dragIndex === hoverIndex) {
                return;
            }  
            //-----------------------------------------------------------------

            // Determine rectangle on screen

            const hoverBoundingRect = dropRef.current.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
              (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return
            }

            props.moveRow(dragIndex, hoverIndex); //call the drop logic 
            item.index = hoverIndex; //update item
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        type: TEAM_ROW_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // const opacity = isDragging ? 0 : 1; // if dragging, non-opaque
    preview(drop(dropRef))
    
    drag(dragRef)
    return (
        <tr ref={dropRef} bgcolor={team.primaryColor} className="Standing-moveable-tbody-tr">
            <td ref={dragRef} className="Standing-moveable-teamSeed">{index + 1}</td>
            <td className="Standing-moveable-teamLogo"><TeamToLogo team={props.team}/></td>
            <td ref={dragRef} className="Standing-moveable-teamName">{team.name}</td>
        </tr>
    );
}

const TeamRowImmutable = (props) =>{
    const team = props.team
    const index = props.index
    return(
        <tr bgcolor={team.primaryColor} className="Standing-moveable-tbody-tr">
            <td className="Standing-moveable-teamSeed">{index}</td>
            <td className="Standing-moveable-teamLogo"><TeamToLogo team={props.team}/></td>
            <td className="Standing-moveable-teamName">{team.name}</td>
        </tr>
    );
}

const TeamToLogo = (props) =>{
    const team = props.team
    switch(team.name){
        case "Atlanta Hawks":
            return <NBAIcons.ATL size={35}/>
            break;
        case "Boston Celtics":
            return <NBAIcons.BOS size={35}/>
            break;
        case "Brooklyn Nets":
            return <NBAIcons.BKN size={35}/>
            break;
        case "Charlotte Hornets":
            return <NBAIcons.CHA size={35}/>
            break;
        case "Chicago Bulls":
            return <NBAIcons.CHI size={35}/>
            break;
        case "Cleveland Cavaliers":
            return <NBAIcons.CLE size={35}/>
        case "Dallas Mavericks":
            return <NBAIcons.DAL size={35}/>
        case "Denver Nuggets":
            return <NBAIcons.DEN size={35}/>
        case "Detroit Pistons":
            return <NBAIcons.DET size={35}/>
        case "Golden State Warriors":
            return <NBAIcons.GSW size={35}/>
        case "Houston Rockets":
            return <NBAIcons.HOU size={35}/>
        case "Indiana Pacers":
            return <NBAIcons.IND size={35}/>
        case "Los Angeles Clippers":
            return <NBAIcons.LAC size={35}/>
        case "Los Angeles Lakers":
            return <NBAIcons.LAL size={35}/>
        case "Memphis Grizzlies":
            return <NBAIcons.MEM size={35}/>
        case "Miami Heat":
            return <NBAIcons.MIA size={35}/>
        case "Milwaukee Bucks":
            return <NBAIcons.MIL size={35}/>
        case "Minnesota Timberwolves":
            return <NBAIcons.MIN size={35}/>
        case "New Orleans Pelicans":
            return <NBAIcons.NOP size={35}/>
        case "New York Knicks":
            return <NBAIcons.NYK size={35}/>
        case "Oklahoma City Thunder":
            return <NBAIcons.OKC size={35}/>
        case "Orlando Magic":
            return <NBAIcons.ORL size={35}/>
        case "Philadelphia 76ers":
            return <NBAIcons.PHI size={35}/>
        case "Phoenix Suns":
            return <NBAIcons.PHX size={35}/>
        case "Portland Trail Blazers":
            return <NBAIcons.POR size={35}/>
        case "Sacramento Kings":
            return <NBAIcons.SAC size={35}/>
        case "San Antonio Spurs":
            return <NBAIcons.SAS size={35}/>
        case "Toronto Raptors":
            return <NBAIcons.TOR size={35}/>
        case "Utah Jazz":
            return <NBAIcons.UTA size={35}/>
        case "Washington Wizards":
            return <NBAIcons.WAS size={35}/>
        default:
            return <NBAIcons.WAS size={35}/>
    }
}

const Standing = (props) => {
    const [teams, setTeams] = useState(props.teams);

    useEffect(() => {
        if (JSON.stringify(props.teams) != JSON.stringify(teams)) {
            setTeams(props.teams);
        }
    }, [props.teams]);

    const moveRow = (dragIndex, hoverIndex) => {
        const dragTeam = teams[dragIndex]
        setTeams(
            update(teams, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragTeam],  
                ],
            })
        )
    };

    useEffect(() => {
        if (props.is_west){
            props.setUserStandings(props.user_id, teams, [], true, props.is_editable);
        } else{
            props.setUserStandings(props.user_id, [], teams, false, props.is_editable);
        }
    }, [teams])
    


    let confirmationSection;
    if (props.is_editable){
        confirmationSection = (
        <DndProvider backend={HTML5Backend}>
        <div>
                <table className="Standing-Table">
                    <thead align="center" valign="middle" className="Standing-Table-Header">
                        <tr>
                            <th>Your Prediction</th>
                        </tr>
                    </thead>
                    <tbody>

                        {teams.map((team, index) => (
                            <TeamRow    
                                key={team.name}
                                team={team}
                                index={index}
                                moveRow={moveRow}
                            />
                        ))}
                    </tbody>
                </table>
        </div>
        </DndProvider>
        )
    } else {
        confirmationSection = (
            <div>
                <table className="Standing-Table">
                    <thead align="center" valign="middle" className="Standing-Table-Header">
                        <tr>
                            <th>True Standings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        teams.map((team, index) => (
                            <TeamRowImmutable    
                                key={team.name}
                                team={team}
                                index={index + 1}
                            />
                        ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            {confirmationSection}
        </div>
        
    );
   
};

export default Standing;

