// The page that the user is redirected to when they register - ask them
// to verify their email

import React from "react";
import logo from "../../assets/logo.png";
import "./css/ActivationNotice.css";
import "./css/Common.css";

function ActivationNotice() {
  return (
    <div className="main">
      <div className="container">
        <div className="notice_logo">
          <img className="notice_logo_image" alt="" src={logo} />
          <label className="notice_project_name">pigeon</label>
        </div>
        <div className="notice">
          <div className="notice_header">Verify your email</div>
          <div className="notice_body">
            We have sent an email on your email id. Please click on the link
            provided in the mail to activate your account.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivationNotice;
