import React from "react";
import "./common.css";
import logo from "../../assets/logo.png";

function Register() {
  return (
    <div className="main">
      <div className="container">
        <div className="logo">
          <img className="logo_image" alt="" src={logo} />
          <label className="project_name">pigeon</label>
        </div>
        <form className="details">
          <input
            type="email"
            autoFocus
            className="password"
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
            placeholder="Re-Enter Password"
          ></input>
          <button className="submit_button" type="submit">
            Register
          </button>
        </form>
        <div className="other_option">
          Already have an account? <a href="https://google.com">Login.</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
