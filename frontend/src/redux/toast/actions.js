import { v4 as uuidv4 } from "uuid";
import * as actions from "./actionTypes";
import { store } from "../store";

export const addToast = (description, toastType) => (dispatch) => {
  console.log(description, toastType);
  const id = uuidv4();
  const toast = {
    id,
    description,
    toastType,
  };
  console.log(toast);

  dispatch({
    type: actions.ADD_TOAST,
    toast,
  });

  // if multiple toasts are present then increase the TTL of individual toast
  const time = 5000 + store.getState().toast.toasts.length * 1000;
  setTimeout(function () {
    if (store.getState().toast.toasts.includes(toast)) {
      dispatch({ type: actions.DELETE_TOAST, id });
    }
  }, time);
};

export const deleteToast = (id) => (dispatch) => {
  dispatch({ type: actions.DELETE_TOAST, id });
};
