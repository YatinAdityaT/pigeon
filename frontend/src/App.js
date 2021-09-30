import React, { useEffect, useRef } from "react";
import {
  toggle_add_participant_modal,
  toggle_add_group_modal,
  checkLogin,
} from "./redux";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Activate from "./components/auth/Activate";
import ActivationNotice from "./components/auth/ActivationNotice";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Register from "./components/auth/Register";
import ChatApp from "./components/ChatApp/ChatApp";
import Toast from "./components/ChatApp/others/Toast";
import Modal from "./components/ChatApp/others/Modal";

function App({
  loggedIn,
  checkIfLoggedIn,
  toggleModalAddParticipant,
  toggleModalAddGroup,
  showModalAddGroup,
  showModalAddParticipants,
}) {
  if (showModalAddGroup && showModalAddParticipants) {
    // if both return true for some reason then
    // toggle them both off as this state shouldn't exist!
    toggleModalAddGroup();
    toggleModalAddParticipant();
  }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      if (!loggedIn) {
        // component did mount
        // Check if the user's browser provided a
        // valid session cookie
        checkIfLoggedIn();
      }
      mounted.current = true;
    }
  });

  return (
    <Router>
      <div className="app">
        <Toast />
        <Modal />
        <Switch>
          <Route path="/register/" exact component={Register} />
          <Route path="/login/" exact component={Login} />
          <Route path="/notice/" exact component={ActivationNotice} />
          <Route path="/activate/:uid/:token" exact component={Activate} />
          <PrivateRoute path="/chat/" exact component={ChatApp} />
          <Redirect from="*" to="/chat/" />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    showModalAddParticipant: state.modal.addParticipant,
    showModalAddGroup: state.modal.addGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIfLoggedIn: () => {
      dispatch(checkLogin());
    },

    toggleModalAddGroup: () => {
      dispatch(toggle_add_group_modal());
    },
    toggleModalAddParticipant: () => {
      dispatch(toggle_add_participant_modal());
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
