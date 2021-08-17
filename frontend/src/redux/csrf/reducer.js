import { csrfState } from "./state";
import * as actions from "./actionTypes";

const csrf_token_success = (state, action) => {
  return {
    ...state,
    csrfToken: action.csrfToken,
  };
};

const csrfReducer = (state = csrfState, action) => {
  switch (action.type) {
    case actions.CSRF_TOKEN_SUCCESS:
      return csrf_token_success(state, action);

    default:
      return state;
  }
};

export default csrfReducer;
