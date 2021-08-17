import { activeState } from "./state";
import * as actions from "./actionTypes";
import * as loginActions from "../login/actionTypes";

//helper functions for activation reducer

const activate_success = (state, action) => {
  return {
    ...state,
    active: true,
  };
};

const activate_failed = (state, action) => {
  return {
    ...state,
    active: false,
  };
};

// Activation reducer
const activateReducer = (state = activeState, action) => {
  switch (action.type) {
    case actions.ACTIVATE_FAILED:
      return activate_failed(state, action);

    case loginActions.LOGIN_SUCCESS:
    case actions.ACTIVATE_SUCCESS:
      return activate_success(state, action);

    default:
      return state;
  }
};

export default activateReducer;
