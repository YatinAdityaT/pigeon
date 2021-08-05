import * as actions from "./actionTypes";

const initialState = {
  joined_chat: false,
  chatId: "",
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.JOIN_CHAT:
      return {
        joined_chat: true,
        chatId: action.payload,
      };
    case actions.LEAVE_CHAT:
      return {
        joined_chat: false,
        chatId: "",
      };
    default:
      return state;
  }
};

export default chatReducer;
