import * as actions from "./userActionTypes";

// Initial state of the user auth
const initialState = {
  token: null,
  error: null,
  loading: false,
};

// utility functions that modify the state of the store
const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    token: action.token,
    loading: false,
    error: null,
  };
};

const authFailed = (state, action) => {
  return {
    token: null,
    loading: false,
    error: action.error,
  };
};

const authLogout = (state, action) => {
  return {
    ...initialState,
  };
};

// actual reducer that assigns the utility functions
// based on the action type requested
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_FAILED:
      return authFailed(state, action);
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_LOGOUT:
      return authLogout(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
