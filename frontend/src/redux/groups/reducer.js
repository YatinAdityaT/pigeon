import { chatGroupState } from "./state";
import * as actions from "./actionTypes";

const load_chat_groups = (state, action) => {
  return {
    ...state,
    group_list: action.group_list,
  };
};

const select_group = (state, action) => {
  return {
    ...state,
    activeGroup: state.group_list.filter((x) => {
      return Object.keys(x)[0] == action.groupId;
    })[0],
  };
};

const load_messages = (state, action) => {
  /*
    Loads messages when a chat group name is clicked on.
    If messages already exist for the chat group, then it 
    overrides the previous value
  */
  var chat_id = Object.keys(action.message_list)[0];
  const messages = JSON.parse(action.message_list[chat_id]);
  var message_list = state.message_list;

  message_list[chat_id] = messages;

  // the following line creates a new message_list object
  // this makes sure that the old object isn't mutated and passed
  // hence causing react to re-render as it detects the state updating
  message_list = Object.assign({}, message_list, { chat_id: messages });

  return {
    ...state,
    message_list: message_list,
  };
};

const add_message = (state, action) => {
  var message_list = state.message_list;
  const chat_id = action.chat_id;

  if (message_list[chat_id] == undefined) {
    message_list[chat_id] = [];
  }

  // creates a new object instead of mutating it
  message_list = Object.assign({}, message_list, {
    chat_id: message_list[chat_id].push(action.message),
  });

  return {
    ...state,
    message_list: message_list,
  };
};
const clear_active = (state, action) => {
  return {
    ...state,
    activeGroup: null,
    messages: [],
  };
};

const add_socket = (state, action) => {
  var sockets = state.sockets;
  const chat_id = action.chat_id;
  var socket = action.socket;
  sockets = Object.assign({}, sockets, { [chat_id]: socket });

  return {
    ...state,
    sockets: sockets,
  };
};

const chatGroupReducer = (state = chatGroupState, action) => {
  switch (action.type) {
    case actions.LOAD_CHAT_GROUPS:
      return load_chat_groups(state, action);

    case actions.SELECT_GROUP:
      return select_group(state, action);

    case actions.LOAD_MESSAGES:
      return load_messages(state, action);

    case actions.ADD_MESSAGE:
      return add_message(state, action);

    case actions.CLEAR_ACTIVE:
      return clear_active(state, action);

    case actions.ADD_SOCKET:
      return add_socket(state, action);

    default:
      return state;
  }
};

export default chatGroupReducer;
