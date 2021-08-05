import * as actions from "./actionTypes";

const initialRegisterState = {
  error: null,
  registered: false,
  loading: false,
};

//helper functions for registration reducer
const register = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};
const register_success = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    registered: true,
  };
};
const register_failed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    registered: false,
  };
};

// Registration reducer
const registerReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case actions.REGISTER:
      return register(state, action);
    case actions.REGISTER_FAILED:
      return register_failed(state, action);
    case actions.REGISTER_SUCCESS:
      return register_success(state, action);
    default:
      return state;
  }
};

export default registerReducer;
