// Custom configuration for fetch

// Tries to add the CSRF token from redux store into the
// X-CSRFToken header of each request made to the server
// Also sets the Content-Type to application/json and the
// credentials to same-origin
import { store } from "./redux/store";

function fetch_(url, options) {
  let newOptions = { ...options };

  newOptions.headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": store.getState().csrf.csrfToken,
  };

  newOptions.credentials = "same-origin";

  return fetch(url, newOptions);
}

export default fetch_;
