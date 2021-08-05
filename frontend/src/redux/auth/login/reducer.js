import * as actions from "./actionTypes";

// Initial states of login
const initialLoginState = {
  error: null,
  loggedIn: false,
  loading: false,
  user_email: null,
  sessionId: null,
};

// helper functions for login reducer
const login = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const login_success = (state, action) => {
  return {
    // ...state,
    loading: false,
    loggedIn: true,
    error: null,
    user_email: action.user_email,
    sessionId: action.session_id,
  };
};

const login_failed = (state, action) => {
  return {
    ...state,
    loading: false,
    loggedIn: false,
    error: action.error,
    user_email: null,
  };
};

// login reducer
const loginReducer = (state = { ...initialLoginState }, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return login(state, action);
    case actions.LOGIN_FAILED:
      return login_failed(state, action);
    case actions.LOGIN_SUCCESS:
      return login_success(state, action);
    default:
      return state;
  }
};

export default loginReducer;
