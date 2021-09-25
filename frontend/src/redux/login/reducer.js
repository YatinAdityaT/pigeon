import * as actions from "./actionTypes";
import { loginState } from "./state";

const login_success = (state, action) => {
  return {
    ...state,
    loggedIn: true,
    userEmail: action.user_email,
  };
};

const login_failed = (state, action) => {
  return {
    ...state,
    loggedIn: false,
    userEmail: null,
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
