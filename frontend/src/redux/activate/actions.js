import * as actions from "./actionTypes";
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
      body: { uid: uid, token: token },
    });

    console.log(result);
    if (!result.ok) throw new Error("Activation failed");
  } catch (err) {
    dispatch({
      type: actions.ACTIVATE_FAILED,
      error: err,
    });
    return;
  }

  dispatch({
    type: actions.ACTIVATE_SUCCESS,
  });
};
