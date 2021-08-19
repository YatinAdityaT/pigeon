import { loginState } from "./state";
import { PURGE } from "redux-persist";
import * as actions from "./actionTypes";
import { persistor } from "../store";

const login_success = (state, action) => {
  return {
    ...state,
    loggedIn: true,
    // userEmail: action.user_email, FIX_ME!
    // sessionId: action.session_id,
  };
};

const login_failed = (state, action) => {
  return {
    ...state,
    loggedIn: false,
    // userEmail: null,
    // sessionId: null,
  };
};

// login reducer
const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case actions.LOGIN_FAILED:
      return login_failed(state, action);

    case actions.LOGIN_SUCCESS:
      return login_success(state, action);

    default:
      return state;
  }
};

export default loginReducer;
