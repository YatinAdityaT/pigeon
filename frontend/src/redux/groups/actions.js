import * as actions from "./actionTypes";
import * as toastActions from "../toast/actions";
import fetch_ from "../../fetch_";

export const get_chat_groups = () => async (dispatch) => {
  dispatch({
    type: actions.GET_CHAT_GROUPS,
  });

  dispatch({
    type: actions.CLEAR_ACTIVE,
  });

  try {
    const result = await fetch_("/api/chats/", {
      method: "GET",
    });

    try {
      var data = await result.json();
    } catch (err) {
      dispatch(toastActions.addToast("Failed to fetch chats!", "failed"));
      return dispatch({
        type: actions.CHAT_GROUPS_FAILED,
        err,
      });
    }
    if (!result.ok) throw new Error("Failed to fetch chats!");
  } catch (err) {
    dispatch(toastActions.addToast(data.detail, "failed"));
    return dispatch({
      type: actions.CHAT_GROUPS_FAILED,
      err,
    });
  }

  dispatch({
    type: actions.CHAT_GROUPS_SUCCESS,
    chatGroups: data,
  });
  dispatch(toastActions.addToast("Chats fetched successfully!", "success"));
};

export const clicked_on_group = (groupId) => (dispatch) => {
  dispatch({ type: actions.SELECT_GROUP, groupId });
};

export const get_messages = (groupId) => async (dispatch) => {
  dispatch({
    type: actions.GET_MESSAGES,
  });

  try {
    const result = await fetch_("/api/messages/" + groupId, {
      method: "GET",
    });

    try {
      var data = await result.json();
    } catch (err) {
      dispatch(toastActions.addToast("Failed to fetch messages!", "failed"));
      return dispatch({
        type: actions.GET_MESSAGES_FAILURE,
        err,
      });
    }
    if (!result.ok) throw new Error("Failed to fetch messages!");
  } catch (err) {
    dispatch(toastActions.addToast(data.detail, "failed"));
    return dispatch({
      type: actions.GET_MESSAGES_FAILURE,
      err,
    });
  }

  dispatch({
    type: actions.GET_MESSAGES_SUCCESS,
    messages: data,
  });
  dispatch(toastActions.addToast("Messages fetched successfully!", "success"));
};
