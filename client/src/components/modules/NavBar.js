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
      <div className="NavBar-title u-inlineBlock">NBA</div>
      <div className="NavBar-title u-inlineBlock">|</div>
      <div className="NavBar-title-red u-inlineBlock">Predict</div>
      {/* <div className="NavBar-title u-inlineBlock">book</div> */}
      <div className="NavBar-linkContainer u-inlineBlock">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
        </GoogleOAuthProvider>
        <Link to="/" className="NavBar-link"></Link>
        
        {props.userId && (
          <Link to={`/${props.userId}`} className="NavBar-link">
            UserPage
          </Link>
        )}
        <Link to={`/createleague`} className="NavBar-link"> CreateLeague</Link>
        {/* {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => {
              console.log(err)
              console.log("LOGIN FAILED") 
            }}
            className="NavBar-link NavBar-login"
          />
        )} */}
      </div>
    </nav>
  );
};

export default NavBar;
