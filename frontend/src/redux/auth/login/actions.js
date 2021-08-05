import * as actions from "./actionTypes";
import axios from "axios";
import * as registrationActions from "../register/actionTypes";
import * as activateActions from "../activate/actionTypes";

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: actions.LOGIN,
  });

  const body = JSON.stringify({ email, password });

  axios
    .post("/auth/login/", body)
    .then((res) => {
      console.log(res);
      dispatch({
        type: registrationActions.REGISTER_SUCCESS,
      });
      dispatch({
        type: activateActions.ACTIVATE_SUCCESS,
      });
      dispatch({
        type: actions.LOGIN_SUCCESS,
        user_email: res.data.user_email,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.LOGIN_FAILED,
        error: err,
      });
    });
};

export const checkLogin = () => (dispatch) => {
  dispatch({
    type: actions.LOGIN,
  });

  axios
    .get("/auth/session/")
    .then((res) => {
      console.log(res);
      dispatch({
        type: actions.LOGIN_SUCCESS,
        user_email: res.user_email,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.LOGIN_FAILED,
        error: err.response.data.error,
      });
    });
};

// export const getCSRFToken = () => (dispatch) => {
//   axios
//     .get("/auth/csrf")
//     .then((res) => {
//       console.log(res.user_email);
//       dispatch({
//         type: actions.LOGIN_SUCCESS,
//         user_email: res.user_email,
//       });
//       console.log(body, res);
//     })
//     .catch((err) => {
//       console.log(err.response.data.detail);
//       dispatch({
//         type: actions.LOGIN_FAILED,
//         error: err,
//       });
//     });

// }
