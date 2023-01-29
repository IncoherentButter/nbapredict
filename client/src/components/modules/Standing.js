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
    
    // console.log(`Entered TeamRow. Team name = ${team.name}. Index = ${index}`)
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);
    // console.log(`dropRef = ${dropRef}`)
    const [, drop] = useDrop({ 
        accept: TEAM_ROW_TYPE,
        hover(item, monitor) { //hover() is called whenever you hover over component
            //---Check if we can drop---
            // console.log(`entered useDrop's hover()`)
            if (!dropRef.current){
                // console.log(`dropRef.current is FALSE`)
                return
            }
            if (!monitor.canDrop()) {
                // console.log(`monitor.canDrop is FALSE`)
                return;
            }
            //-------------------------
            //------check if we're dragging and hovering in same row------
            const dragIndex = item.index; //index the item started at
            const hoverIndex = index; //index hovering at
            if (dragIndex === hoverIndex) {
                // console.log(`dragIndex === hoverIndex = ${dragIndex}`)
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
                // console.log(`Dragging down + cursor is above 50%`)
              return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                // console.log(`Dragging up + cursor is below 50%`)
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
    // console.log(`drag(dragRef) just called`)
    return (
        // <tr
        //     ref={(node) => { 
        //         drag(drop(node));
        //     }}         
        // >
        //     <td>{index}</td>
        //     <td>{team.name}</td>
        // </tr>
        // <tr>
        //     <td>{index + 1}</td>
        //     <td>{team.name}</td>
        // </tr>
        <tr ref={dropRef} bgcolor={team.primaryColor} className="Standing-moveable-tbody-tr">
            {/* <td ref={dragRef}>mo    ve</td> */}
            <td ref={dragRef} className="Standing-moveable-teamSeed">{index + 1}</td>
            <td className="Standing-moveable-teamLogo"><TeamToLogo team={props.team}/></td>
            <td ref={dragRef} className="Standing-moveable-teamName">{team.name}</td>
            {/* {team.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })} */}
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
    // const [conferenceStanding, setConferenceStanding] = useState(props.teams);
    // const [firstRowIndex, setFirstRowIndex] = useState(-1);
    // const [secondRowIndex, setSecondRowIndex] = useState(-2);
    const [teams, setTeams] = useState(props.teams);

    // teams.forEach((team, index) => {
    //     console.log(`Team at index=${index} is ${team.name}`);
    // })

    // Handles the logic for drag and drop
    function moveTeam(dragIndex, hoverIndex) {
        const newTeams = [...teams];
        const [draggedTeam] = newTeams.splice(dragIndex, 1); //remove the dragged team, assign to draggedTeam
        newTeams.splice(hoverIndex, 0, draggedTeam); //insert draggedTeam after the team at hoverIndex
        setTeams(newTeams); //update teams
    }

    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };

    const moveRow = (dragIndex, hoverIndex) => {
        // console.log(`moveRow called. dragIndex = ${dragIndex}, hoverIndex = ${hoverIndex}`)
        const dragTeam = teams[dragIndex]
        // newTeams.splice(dragIndex, 1);
        // newTeams.splice(hoverIndex, 0, dragTeam);
        // array_move(newTeams, dragIndex, hoverIndex)
        // console.log(`moveRow type of newTeams = ${typeof newTeams[0]}`)
        // for (let team of newTeams){
        //     console.log(`team name = ${team.name}`);
        // }
        // newTeams = teams.splice: [
        //       [dragIndex, 1],
        //       [hoverIndex, 0, dragTeam],  
        //     ]
        
        // setTeams(newTeams)
        setTeams(
            update(teams, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragTeam],  
                ],
            })
        )
        const newTeams = [...teams];
        // setTeams(newTeams)
        
        // const firstTeam = newTeams[firstRowIndex];
        // const secondTeam = newTeams[secondRowIndex];
        // newTeams[firstRowIndex] = secondTeam;
        // newTeams[secondRowIndex] = firstTeam;

        // setTeams(newTeams);
        if (props.is_west){
            console.log(`Working with west.`)
            console.log(`moveRow newTeams West team 1 = ${newTeams[0].name}`)
            console.log(`moveRow West team 1 = ${teams[0].name}`)
            props.setUserStandings(props.user_id, newTeams, [], true);
        } else{
            console.log(`Working with east.`)
            props.setUserStandings(props.user_id, [], newTeams, false);
        }
    };
    

    // const [firstRowIndex, setFirstRowIndex] = useState(0);
    // const [secondRowIndex, setSecondRowIndex] = useState(0);

    // function handleFirstRowChange(event) {
    //     setFirstRowIndex(event.target.value);
    // }

    // function handleSecondRowChange(event) {
    //     setSecondRowIndex(event.target.value);
    // }

    // function handleConfirmClick() {
    //     const newTeams = [...teams];
    //     const firstTeam = newTeams[firstRowIndex];
    //     const secondTeam = newTeams[secondRowIndex];
    //     newTeams[firstRowIndex] = secondTeam;
    //     newTeams[secondRowIndex] = firstTeam;

    //     setTeams(newTeams);

    //     if (props.is_west){
    //         console.log(`Working with west.`)
    //         console.log(`handleConfirmClick newTeams West team 1 = ${newTeams[0].name}`)
    //         console.log(`handleConfirmClick West team 1 = ${teams[0].name}`)
    //         props.setUserStandings(props.user_id, newTeams, [], true);
    //     } else{
    //         console.log(`Working with east.`)
    //         props.setUserStandings(props.user_id, [], teams, false);
    //     }

    // }


    let confirmationSection;
    if (props.is_editable){
        confirmationSection = (
        <DndProvider backend={HTML5Backend}>
        <div>
                <table className="Standing-Table">
                    <thead>
                        <tr>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {teams.map((team, index) => (
                                <tr key={team.name} className="Standing-tbody-tr">
                                    <td>{index + 1}</td>
                                    <td>{team.name}</td>
                                </tr>
                        ))} */}
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
            
            {/* <label>
                Choose the first row to swap:
                <select value={firstRowIndex} onChange={handleFirstRowChange}>
                    {[...Array(15)].map((_, i) => (
                        <option key={i} value={i}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Choose the second row to swap:
                <select value={secondRowIndex} onChange={handleSecondRowChange}>
                    {[...Array(15)].map((_, i) => (
                        <option key={i} value={i}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button onClick={handleConfirmClick}>Confirm</button> */}
        </div>
        </DndProvider>
        )
    } else {
        confirmationSection = (
            <div>
                <table className="Standing-Table">
                    <thead>
                        <tr>
                            <th>Seed</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {teams.map((team, index) => (
                            <tr key={team.name} className="Standing-tbody-tr">
                                <td>{index + 1}</td>
                                <td>{team.name}</td>
                            </tr>
                        ))} */}
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
    // return ( 
    //     <div>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Seed</th>
    //                     <th>Team</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {props.teams.map((team, index) => (
                        // <tr key={team.name}>
                        //     <td>{index + 1}</td>
                        //     <td>{team.name}</td>
                        // </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    //     // <Table
    //     // className = "table table-hover table-responsive">
    //         // <thead className="thead-dark">
    //         //     <tr>
    //         //         <th scope="col">Seed</th>
    //         //         <th scope="col">Team</th>
    //         //     </tr>
    //         // </thead>
    //         // <tbody>
    //             // {props.teams.map((team, index) => (
    //             // <tr key={team.name}>
    //             //     <td>
    //             //         <span>
    //             //             {index + 1}
    //             //         </span>
    //             //     </td>
    //             //     <td>
    //             //         {team.logo}
    //             //         {team.name}
    //             //     </td>
    //             // </tr>
    //             // ))}
    //         // </tbody>
    //     // </Table> 
    // )
};

export default Standing;

{/* <Table
className = "table table-hover table-responsive">
 <thead className="thead-dark">
    
 </thead>
</Table>  */}


    // const getRowId = React.useCallback(row => {
//         return row.id
//     });

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//     } = useTable({
//         data: records,
//         columns,
//         getRowId,
//     });



//     return (
//     <table {...getTableProps()}>
//         <thead>
//             {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//                 <th></th>
//                 {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//             </tr>
//             ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//             {rows.map(
//             (row, index) =>
//                 prepareRow(row) || (
//                 <Row
//                     index={index}
//                     row={row}
//                     moveRow={moveRow}
//                     {...row.getRowProps()}
//                 />
//                 )
//             )}
//         </tbody>
//     </table>
//     )
// }