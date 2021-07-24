import * as actions from "./userActionTypes";

// this file holds the actions that the user can take
// each action returns an action type that tells the reducer
// how to update the store's state
export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
  };
};

export const authFailed = (error) => {
  return {
    type: actions.AUTH_FAILED,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationTime");
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/login", {
        username,
        password,
      })
      .then((response) => {
        const token = response.data.key;
        const expirationTime = new Date(new Date().getTime() + 3600 + 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(token));
        checkAuthTimeout(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFailed(err));
      });
  };
};

export const authSignUp = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/login", {
        username,
        email,
        password1,
        password2,
      })
      .then((response) => {
        const token = response.data.key;
        const expirationTime = new Date(new Date().getTime() + 3600 + 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(token));
        checkAuthTimeout(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFailed(err));
      });
  };
};
