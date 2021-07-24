import React from "react";
import "./common.css";
import logo from "../../assets/logo.png";
import axios from "axios";

function Register() {
  let submitForm = (event) => {
    event.preventDefault();
    const data = {
      email: document.getElementsByClassName("email").value,
      username: document.getElementsByClassName("usename").value,
      password: document.getElementsByClassName("password1").value,
      re_password: document.getElementsByClassName("password2").value,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: data,
      path: "/auth/users/",
    };
    axios(options);
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
