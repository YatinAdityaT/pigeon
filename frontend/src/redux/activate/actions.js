import * as actions from "./actionTypes";
import * as toastActions from "../toast/actions";
import fetch_ from "../../fetch_";

// sends an activation post request to the /auth/users/activation/ endpoint containing
// the uid and token extracted from the url

export const activate = (uid, token) => async (dispatch) => {
  // ACTIVATE in progress - dispatch the ACTIVATE action
  dispatch({
    type: actions.ACTIVATE,
  });

  try {
    const result = await fetch_("/auth/users/activation/", {
      method: "POST",
      body: JSON.stringify({ uid: uid, token: token }),
    });

    if (!result.ok) throw new Error("Activation failed");
  } catch (err) {
    dispatch(toastActions.addToast("Something went wrong", "failed"));
    return dispatch({
      type: actions.ACTIVATE_FAILED,
      error: err,
    });
  }

  dispatch(toastActions.addToast("Activation successful!", "success"));
  dispatch({
    type: actions.ACTIVATE_SUCCESS,
  });
};
