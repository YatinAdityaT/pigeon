import * as actions from "./actionTypes";
import fetch_ from "../../fetch_";

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: actions.LOGIN,
  });

  try {
    const result = await fetch_("/auth/login/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(result);

    if (!result.ok) throw new Error("Failed to login");
  } catch (err) {
    return dispatch({
      type: actions.LOGIN_FAILED,
      err,
    });
  }

  dispatch({
    type: actions.LOGIN_SUCCESS,
    // user_email: res.data.user_email, FIX_ME!
  });
};

export const checkLogin = () => async (dispatch) => {
  dispatch({
    type: actions.LOGIN,
  });

  try {
    const result = await fetch_("/auth/session/", { method: "GET" });

    console.log(result);

    if (!result.ok) throw new Error("The user is not logged in");
  } catch (err) {
    return dispatch({
      type: actions.LOGIN_FAILED,
      err,
    });
  }

  dispatch({
    type: actions.LOGIN_SUCCESS,
    // user_email: FIX_ME!
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: actions.LOGOUT,
  });

  try {
    const result = await fetch_("/auth/logout/", {
      method: "GET",
    });

    console.log(result);

    if (!result.ok) throw new Error("Failed to logout");
  } catch (err) {
    dispatch({
      type: actions.LOGOUT_FAILED,
      err,
    });
    return;
  }

  dispatch({
    type: actions.RESET,
  });
};
