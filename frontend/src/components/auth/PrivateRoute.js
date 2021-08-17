// Protected route for pages that require the user to
// be logged in
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    // returns a route that either renders the component or renders a redirect
    // based on whether of not the user is logged in - which is loaded from redux
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
