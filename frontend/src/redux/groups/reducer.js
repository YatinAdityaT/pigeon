import { chatGroupState } from "./state";
import * as actions from "./actionTypes";

const chatGroupReducer = (state = chatGroupState, action) => {
  switch (action.type) {
    case actions.GET_CHAT_GROUPS:
      return login_failed(state, action);

    case actions.LOGIN_SUCCESS:
      return login_success(state, action);

    default:
      return state;
  }
};

export default loginReducer;
