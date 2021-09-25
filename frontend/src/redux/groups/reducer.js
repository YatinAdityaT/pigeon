import { chatGroupState } from "./state";
import * as actions from "./actionTypes";

const chat_groups_failed = (state, action) => {
  return {
    ...state,
    chatGroups: [],
  };
};

const chat_groups_success = (state, action) => {
  return {
    ...state,
    chatGroups: action.chatGroups,
  };
};

const select_group = (state, action) => {
  return {
    ...state,
    activeGroup: state.chatGroups.filter(
      (x) => x.chat_room.id == action.groupId
    ),
  };
};

const messages_success = (state, action) => {
  return {
    ...state,
    messages: action.messages,
  };
};

const clear_active = (state, action) => {
  return {
    ...state,
    activeGroup: null,
    messages: [],
  };
};

const chatGroupReducer = (state = chatGroupState, action) => {
  switch (action.type) {
    case actions.CHAT_GROUPS_FAILED:
      return chat_groups_failed(state, action);

    case actions.CHAT_GROUPS_SUCCESS:
      return chat_groups_success(state, action);

    case actions.SELECT_GROUP:
      return select_group(state, action);

    case actions.GET_MESSAGES_SUCCESS:
      return messages_success(state, action);

    case actions.CLEAR_ACTIVE:
      return clear_active(state, action);

    default:
      return state;
  }
};

export default chatGroupReducer;
