import React from "react";
import "./AboutPage.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="about_page__container">
      <div className="logo logo_about_page">
        <img className="logo_image about_page_logo_image" alt="" src={logo} />
      </div>
      <div className="info">
        <h2>Welcome to Pigeon!</h2>
        Pigeon is a fast, easy to use, browser-based chat application. It uses
        Django and Django channels in the backend and React, React-router and
        React-redux in the frontend.
        <br />
        <br /> Pigeon allows you to invite your friends to any chat group via
        email. Create your account now by{" "}
        <Link to="/register">registering yourself</Link>. If you already have an
        account then go to the <Link to="/login">Login page</Link>. Pigeon uses
        your email id to identify you so it is necessary to provide a valid
        email address while creating an account.
        <br />
        <br />
        You can find the project's code and more information about it on its{" "}
        <a href="https://github.com/YatinAdityaT/pigeon">GitHub page</a>.
      </div>
    </div>
  );
}

export default AboutPage;
