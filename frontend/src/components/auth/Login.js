import React from "react";
import "./common.css";
import logo from "../../assets/logo.png";

function Login() {
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
            className="password"
            type="password"
            placeholder="Password"
          ></input>

          <button className="submit_button" type="submit">
            Login
          </button>
        </form>
        <div className="other_option">
          No account? <a href="https://google.com">Create One.</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
