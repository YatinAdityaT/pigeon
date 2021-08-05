import * as actions from "./actionTypes";
import axios from "axios";

// this file holds the actions that the user can take
// each action returns an action type that tells the reducer
// how to update the store's state

export const register =
  (email, username, password, re_password) => (dispatch) => {
    dispatch({
      type: actions.REGISTER,
    });
    console.log(email, username, password, re_password);
    axios
      .post("/auth/users/", {
        email: email,
        username: username,
        password: password,
        re_password: re_password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: actions.REGISTER_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: actions.REGISTER_FAILED,
          error: err.response.data,
        });
      });
  };
