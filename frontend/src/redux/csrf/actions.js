// Gets the CSRF token from the /auth/csrf/ endpoint.
// I am intentionally not dispatching the CSRF_TOKEN_SUCCESS
// or CSRF_TOKEN_FAILURE actionTypes as they aren't really
// important or used anywhere in the app
import * as actions from "./actionTypes";

export const getCSRFToken = () => async (dispatch) => {
  var result;
  try {
    result = await fetch("/auth/csrf/", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "same-origin",
    });
    if (!result.ok) throw new Error("Failed to get CSRF token");
  } catch (err) {}

  // if successful, dispatch CSRF_TOKEN_SUCCESS to
  // store the token in state. This token will be used
  // in all fetch requests by adding it to the X-CSRFToken
  // header (done by fetch_ function - a modification of fetch)
  let csrfToken = result.headers.get("X-CSRFToken");
  dispatch({
    type: actions.CSRF_TOKEN_SUCCESS,
    csrfToken,
  });
};
