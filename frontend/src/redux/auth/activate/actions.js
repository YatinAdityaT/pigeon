import * as actions from "./actionTypes";
import axios from "axios";

// sends an activation post request to the /auth/users/activation/ endpoint containing
// the uid and token extracted from the url

export const activate = (uid, token) => (dispatch) => {
  // ACTIVATE in progress - dispatch the ACTIVATE action
  dispatch({
    type: actions.ACTIVATE,
  });

  axios
    .post("/auth/users/activation/", { uid: uid, token: token })
    .then((res) => {
      // if the post request's response was positive then dispatch the ACTIVATE_SUCCESS action
      dispatch({
        type: actions.ACTIVATE_SUCCESS,
      });
    })
    .catch((err) => {
      // if the post request's response was negative then dispatch the ACTIVATE_FAILED action
      dispatch({
        type: actions.ACTIVATE_FAILED,
        error: err.response.data,
      });
    });
};
