// This is the rootReducer file. All is does is to combine reducers into a single rootReducer
// and export it - to be used in the store
import { combineReducers } from "redux";
import activateReducer from "./activate/reducer";
import csrfReducer from "./csrf/reducer";
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";
import chatReducer from "./chat/reducer";
import appReducer from "./chat/reducer";

const rootReducer = combineReducers({
  chat: chatReducer,
  login: loginReducer,
  register: registerReducer,
  activate: activateReducer,
  csrf: csrfReducer,
  app: appReducer,
});

export default rootReducer;
