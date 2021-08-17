import * as actions from "./actionTypes";

export const joinChat = (chatId) => {
  return {
    type: actions.JOIN_CHAT,
    payload: chatId,
  };
};

export const leaveChat = () => {
  return {
    type: actions.LEAVE_CHAT,
  };
};
