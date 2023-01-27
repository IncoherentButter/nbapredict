import React, { useState, useEffect } from "react";
// import { useDrag, useDrop } from 'react-dnd';
import ReactDOM from 'react-dom'
import Teams from "../../team-enums.js";
import "./Standing.css";

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
const type = 'teamRow';

// function TeamRow({ team, index, moveTeam }) {
//     const [, drop] = useDrop({ 
//         accept: type,
//         hover(item, monitor) { //hover() is called whenever you hover over component
//             if (!monitor.canDrop()) { //if you cant drop the object here, then dont do anything
//                 return;
//             }
//             const dragIndex = item.index; //index the item started at
//             const hoverIndex = index; //index hovering at
//             if (dragIndex === hoverIndex) { //if havent moved indices, dont do anything
//                 return;
//             }
//             moveTeam(dragIndex, hoverIndex); //call the drop logic 
//             item.index = hoverIndex; //update item
//         },
//     });
//     const [{ isDragging }, drag] = useDrag({
//         item: { type, index },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     });
//     const opacity = isDragging ? 0 : 1; // if dragging, non-opaque
//     return (
//         <tr
//             ref={(node) => { 
//                 drag(drop(node));
//             }}
//             style={{ opacity }}
//         >
//             <td>{index + 1}</td>
//             <td>{team.name}</td>
//         </tr>
//     );
// }

const Standing = (props) => {
    // const [conferenceStanding, setConferenceStanding] = useState(props.teams);
    // const [firstRowIndex, setFirstRowIndex] = useState(-1);
    // const [secondRowIndex, setSecondRowIndex] = useState(-2);
    const [teams, setTeams] = useState(props.teams);

    teams.forEach((team, index) => {
        console.log(`Team at index=${index} is ${team.name}`);
    })
    // const handleChange(e){
    //     alert('')
    // }

    // Handles the logic for drag and drop
    // function moveTeam(dragIndex, hoverIndex) {
    //     const newTeams = [...conferenceStanding];
    //     const [draggedTeam] = newTeams.splice(dragIndex, 1); //remove the dragged team, assign to draggedTeam
    //     newTeams.splice(hoverIndex, 0, draggedTeam); //insert draggedTeam after the team at hoverIndex
    //     setConferenceStanding(newTeams); //update teams
    // }

    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [secondRowIndex, setSecondRowIndex] = useState(0);

    function handleFirstRowChange(event) {
        setFirstRowIndex(event.target.value);
    }

    function handleSecondRowChange(event) {
        setSecondRowIndex(event.target.value);
    }

    function handleConfirmClick() {
        const newTeams = [...teams];
        const firstTeam = newTeams[firstRowIndex];
        const secondTeam = newTeams[secondRowIndex];
        newTeams[firstRowIndex] = secondTeam;
        newTeams[secondRowIndex] = firstTeam;

        setTeams(newTeams);

        if (props.is_west){
            props.setUserStandings(props.user_id, newTeams, [], true);
        } else{
            props.setUserStandings(props.user_id, [], newTeams, false);
        }

    }


    let confirmationSection;
    if (props.is_editable){
        confirmationSection = (
        <div>
            <label>
                Choose the first row to swap:
                <select value={firstRowIndex} onChange={handleFirstRowChange}>
                    {[...Array(15)].map((_, i) => (
                        <option key={i} value={i + 1}>
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
            <button onClick={handleConfirmClick}>Confirm</button>
            <table className="Standing-Table">
                <thead>
                    <tr>
                        <th>Seed</th>
                        <th>Team</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teams.map((team, index) => (
                            <tr key={index} className="Standing-tbody-tr">
                                <td>{index + 1}</td>
                                <td>{team.name}</td>
                            </tr>
                        ))
                    }
                    {/* {conferenceStanding.map((team, index) => (
                        <TeamRow    
                            key={team.name}
                            team={team}
                            index={index}
                            moveTeam={moveTeam}
                        />
                    ))} */}
                </tbody>
            </table>
        </div>
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
                        {teams.map((team, index) => (
                            <tr key={team.name} className="Standing-tbody-tr">
                                <td>{index + 1}</td>
                                <td>{team.name}</td>
                            </tr>
                        ))}
                        {/* {conferenceStanding.map((team, index) => (
                            <TeamRow    
                                key={team.name}
                                team={team}
                                index={index}
                                moveTeam={moveTeam}
                            />
                        ))} */}
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

//     const moveRow = (dragIndex, hoverIndex) => {
//         const dragRecord = records[dragIndex]
//         setRecords(
//             update(records, {
//                 $splice: [
//                   [dragIndex, 1],
//                   [hoverIndex, 0, dragRecord],  
//                 ],
//             })
//         )
//     };

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