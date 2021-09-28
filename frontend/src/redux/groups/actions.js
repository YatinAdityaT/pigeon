import * as actions from "./actionTypes";

export const get_chat_groups = (group_list) => (dispatch) => {
  dispatch({
    type: actions.LOAD_CHAT_GROUPS,
    group_list,
  });
};
export const clicked_on_group = (groupId) => (dispatch) => {
  dispatch({ type: actions.SELECT_GROUP, groupId });
};

export const get_messages = (message_list) => (dispatch) => {
  dispatch({
    type: actions.LOAD_MESSAGES,
    message_list,
  });
};

export const add_message = (message, chat_id) => (dispatch) => {
  dispatch({
    type: actions.ADD_MESSAGE,
    message,
    chat_id,
  });
};
