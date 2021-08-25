import * as actions from "./actionTypes";
import * as toastActions from "../toast/actions";
import fetch_ from "../../fetch_";

export const get_chat_groups = (email) => async (dispatch) => {
  dispatch({
    type: actions.LOGIN,
  });

  try {
    // try to fetch a url
    const result = await fetch_("/auth/login/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    try {
      // Await the result, get the data
      // and put it in the global state
      var data = await result.json();
    } catch (err) {
      // In case of failure in converting
      // the result to json. Notify the user
      // the "something" went wrong and exit

      dispatch(toastActions.addToast("Something went wrong :(", "failed"));
      return dispatch({
        type: actions.LOGIN_FAILED,
        err,
      });
    }

    // Check if the request is ok. If it is not ok
    // then throw an error for the catch statement
    // to catch
    if (!result.ok) throw new Error("Failed to login");
  } catch (err) {
    // result.ok was false, notify the user about the
    // server's response and fail the log-in process
    // and exit
    dispatch(toastActions.addToast(data.detail, "failed"));
    return dispatch({
      type: actions.LOGIN_FAILED,
      err,
    });
  }

  // All ok, notify the user and log them in
  dispatch({
    type: actions.LOGIN_SUCCESS,
    // user_email: res.data.user_email, FIX_ME!
  });
  dispatch(toastActions.addToast(data.detail, "success"));
};
