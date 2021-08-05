import * as actions from "./actionTypes";

const initialActivateState = {
  error: null,
  active: false,
  loading: false,
};

//helper functions for activation reducer
const activate = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};
const activate_success = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    active: true,
  };
};
const activate_failed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    active: false,
  };
};

// Activation reducer
const activateReducer = (state = initialActivateState, action) => {
  switch (action.type) {
    case actions.ACTIVATE:
      return activate(state, action);
    case actions.ACTIVATE_FAILED:
      return activate_failed(state, action);
    case actions.ACTIVATE_SUCCESS:
      return activate_success(state, action);
    default:
      return state;
  }
};

export default activateReducer;
