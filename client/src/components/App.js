import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";

import NavBar from "./modules/NavBar.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

// import { scrape } from "../bbref-scraper.js";
import HomePage from "./pages/HomePage.js";

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';


// import 'bootstrap-table/dist/bootstrap-table.js';
// import 'bootstrap-table/dist/bootstrap-table.min.css';


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      {/* <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
      <NavBar/>
      <div className="App-container">
        <Router>
          {/* <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
          <HomePage path="/" user_id="Ryan"/>
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
