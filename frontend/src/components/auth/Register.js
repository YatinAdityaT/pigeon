// Registration page

import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/logo.png";
import { getCSRFToken, register } from "../../redux";
import "./css/Common.css";

function Register({ active, registered, getCSRFToken, history, registerUser }) {
  // https://stackoverflow.com/a/53406363/11573842

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      getCSRFToken();
    } else {
      if (registered && !active) {
        history.push("/notice/");
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
    const username = getValue("username");
    const password = getValue("password1");
    const re_password = getValue("password2");

    registerUser(email, username, password, re_password);
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
            className="username"
            type="text"
            placeholder="Username"
          ></input>
          <input
            className="password1"
            type="password"
            placeholder="Password"
          ></input>
          <input
            className="password2"
            type="password"
            placeholder="Re-enter Password"
          ></input>
          <button className="submit_button" type="submit">
            Register
          </button>
        </form>
        <div className="other_option">
          Already have an account? <Link to="/login/">Login.</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    active: state.activate.active,
    error: state.register.error,
    registered: state.register.registered,
    loading: state.register.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (email, username, password, re_password) => {
      dispatch(register(email, username, password, re_password));
    },
    getCSRFToken: () => {
      dispatch(getCSRFToken());
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
