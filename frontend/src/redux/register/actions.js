import * as actions from "./actionTypes";
import fetch_ from "../../fetch_";

export const register =
  (email, username, password, re_password) => async (dispatch) => {
    dispatch({
      type: actions.REGISTER,
    });
    console.log(email, username, password, re_password);
    try {
      const result = await fetch_("/auth/users/", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          re_password: re_password,
        }),
      });
      console.log(result);
      if (!result.ok) throw new Error("Failed to register user");
    } catch (err) {
      dispatch({
        type: actions.REGISTER_FAILED,
        error: err,
      });

      return;
    }
    dispatch({
      type: actions.REGISTER_SUCCESS,
    });
  };
