import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";

import NavBar from "./modules/NavBar.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

// import { scrape } from "../bbref-scraper.js";
import UserPage from "./pages/UserPage.js";
import DefaultPage from "./pages/DefaultPage.js";
import CreateLeague from "./pages/CreateLeague.js";
import JoinLeague from "./pages/JoinLeague.js";
import YourLeagues from "./pages/YourLeagues.js";
import LeaguePage from "./pages/LeaguePage.js";

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';


// import 'bootstrap-table/dist/bootstrap-table.js';
// import 'bootstrap-table/dist/bootstrap-table.min.css';


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [user_score, setUserScore] = useState(Number(-1));

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(user.name);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserName(undefined);
    post("/api/logout");
  };

  const handleScoreUpdate = (newScore) => {
    setUserScore(newScore);
    const userInfo = {user_id: userId, user_score: newScore}
    post("/api/updateScoreInLeague", userInfo).then(() => {
    });
  }

  useEffect(() => {
    if (userId) {
      get("/api/standingprediction", { user_id: userId }).then((standingPrediction) => {      
          const westStandings = standingPrediction.west_predictions;
          const eastStandings = standingPrediction.east_predictions;
          if (standingPrediction.score != undefined){
            setUserScore(standingPrediction.score);
          }
      })
    }
  }, [userId]);


  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
      <div className="App-container">
        <Router>
          <DefaultPage path="/"/>
          <UserPage path="/UserPage" user_id={userId} user_name={userName} user_score={user_score} handleScore={handleScoreUpdate}/>
          <CreateLeague path="/createleague/" style='overflow: hidden' user_id={userId} user_name={userName} user_score={user_score} defaultLeagueNameText="League Name" defaultLeaguePasswordText="League Password"/>
          <JoinLeague path="/JoinLeague" user_id={userId} user_name={userName} user_score={user_score} defaultLeagueNameText="League Name" defaultLeaguePasswordText="League Password"/>
          <YourLeagues path="/YourLeagues/" user_id={userId} user_name={userName} user_score={user_score}/>
          <LeaguePage path="/LeaguePage/:league_name" user_id={userId} user_name={userName} user_score={user_score}/>
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
