// The login screen

import React, { useEffect, useRef } from "react";
import "./css/Common.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCSRFToken, login } from "../../redux";

function Login({ loggedIn, getCSRFToken, logInUser, history }) {
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getCSRFToken();
    } else {
      if (loggedIn) {
        history.push("/chat/");
      }
    }
  });

  const getValue = (className) => {
    return document.getElementsByClassName(className)[0].value;
  };

  // on form submit dispatch the register action
  let submitForm = (event) => {
    event.preventDefault();

    const email = getValue("email");
    const password = getValue("password");

    logInUser(email, password);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="logo">
          <img className="logo_image" alt="" src={logo} />
          <label className="project_name">pigeon</label>
        </div>
        <form className="details" onSubmit={submitForm}>
          <input
            type="email"
            autoFocus
            className="email"
            placeholder="Email"
          ></input>
          <input
            className="password"
            type="password"
            placeholder="Password"
          ></input>

          <button className="btn submit_button" type="submit">
            Login
          </button>
        </form>
        <div className="other_option">
          No account? <Link to="/register/">Create one.</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (email, password) => {
      dispatch(login(email, password));
    },
    getCSRFToken: () => {
      dispatch(getCSRFToken());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
