// This is the rootReducer file. All is does is to combine reducers into a single rootReducer
// and export it - to be used in the store
import { combineReducers } from "redux";
import activateReducer from "./activate/reducer";
import csrfReducer from "./csrf/reducer";
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";
import appReducer from "./app/reducer";
import toastReducer from "./toast/reducer";
import chatGroupReducer from "./groups/reducer";
import modalReducer from "./modal/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  activate: activateReducer,
  csrf: csrfReducer,
  app: appReducer,
  toast: toastReducer,
  chatGroup: chatGroupReducer,
  modal: modalReducer,
});

export default rootReducer;
