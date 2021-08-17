import { appState } from "./state";
import * as activateActions from "../activate/actionTypes";
import * as loginActions from "../login/actionTypes";
import * as registerActions from "../register/actionTypes";

const event = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const success = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
  };
};

const failed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.err,
  };
};

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case activateActions.ACTIVATE:
    case loginActions.LOGIN:
    case loginActions.LOGOUT:
    case registerActions.REGISTER:
      return event(state, action);

    case loginActions.LOGIN_FAILED:
    case loginActions.LOGOUT_FAILED:
    case activateActions.ACTIVATE_FAILED:
    case registerActions.REGISTER_FAILED:
      return failed(state, action);

    // I have intentionally not included LOGOUT_FAILED
    // It will be handled by the rootReducer as we need
    // to reset the entire state (including the persisted)
    case loginActions.LOGIN_SUCCESS:
    case activateActions.ACTIVATE_SUCCESS:
    case registerActions.REGISTER_SUCCESS:
      return success(state, action);

    default:
      return state;
  }
};

export default appReducer;
