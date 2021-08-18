import { toastState } from "./state";
import * as actions from "./actionTypes";

const add_toast = (state, action) => {
  return {
    ...state,
    toasts: [...state.toasts, action.toast],
  };
};
const delete_toast = (state, action) => {
  return {
    ...state,
    toasts: state.toasts.filter((toast) => toast.id != action.id),
  };
};

const toastReducer = (state = toastState, action) => {
  switch (action.type) {
    case actions.ADD_TOAST:
      return add_toast(state, action);

    case actions.DELETE_TOAST:
      return delete_toast(state, action);

    default:
      return state;
  }
};

export default toastReducer;
