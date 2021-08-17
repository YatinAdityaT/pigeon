import { registerState } from "./state";
import * as loginActions from "../login/actionTypes";
import * as actions from "./actionTypes";

const register_success = (state, action) => {
  return {
    ...state,
    registered: true,
  };
};
const register_failed = (state, action) => {
  return {
    ...state,
    registered: false,
  };
};

const registerReducer = (state = registerState, action) => {
  switch (action.type) {
    case actions.REGISTER_FAILED:
      return register_failed(state, action);

    case loginActions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS:
      return register_success(state, action);

    default:
      return state;
  }
};

export default registerReducer;
