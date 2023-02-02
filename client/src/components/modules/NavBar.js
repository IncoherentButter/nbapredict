import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";


import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "449503962510-3bph545kka03uneu6bqv8gvrckl4flub.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="flex-row">
        <div className="NavBar-title ">NBA </div>
        <div className="NavBar-title-red ">Predict</div>
        <div className="NavBar-linkContainer">
          <div><GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {props.userId ? (
              <button
                onClick={() => {
                  googleLogout();
                  props.handleLogout();
                }}
              >
                Logout
              </button>
            ) : (
              <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
            )}
          </GoogleOAuthProvider></div>
          <div><Link to="/" className="NavBar-link">&nbsp; Home</Link></div>
          <div>
            <Link to={`/createleague`} className="NavBar-link">&nbsp; | &nbsp;Create Leagues</Link>
          </div>
          <div>
            <Link to={`/JoinLeague`} className="NavBar-link">&nbsp; | &nbsp;Join Leagues</Link>
          </div>
          <div>
            <Link to={`/YourLeagues`} className="NavBar-link">&nbsp; | &nbsp;View Your Leagues</Link>
          </div>
        </div>
      </div>
      {/* <div className="NavBar-title u-inlineBlock">book</div> */}
      <div className="NavBar-linkContainer">
        <div className="push-right">
            {props.userId && (
              <Link to={`/UserPage`} className="NavBar-link-right">
                Your Predictions
              </Link>
            )}
          </div>
      </div>
    </nav>
  );
};

export default NavBar;
