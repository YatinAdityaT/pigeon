// the page that a user is redirect to when they click on the link
// present in the activation email they received

import React, { useEffect } from "react";
import "./css/Common.css";
import logo from "../../assets/logo.png";
import { useParams } from "react-router";
import { activate } from "../../redux/";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Activate(props) {
  let { uid, token } = useParams();

  useEffect(() => {
    props.activateUserAccount(uid, token);
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="logo notice_logo">
          <img className="logo_image notice_logo_image" alt="" src={logo} />
          <label className="project_name notice_project_name">pigeon</label>
        </div>
        <div className="notice">
          {props.active ? (
            <div className="notice_header">
              Your account has been activated!
            </div>
          ) : (
            ""
          )}
          <Link to="/login/">
            <button className="notice_button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    active: state.activate.active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateUserAccount: (uid, token) => {
      dispatch(activate(uid, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Activate);
