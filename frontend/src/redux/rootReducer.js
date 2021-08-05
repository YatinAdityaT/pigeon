// This is the rootReducer file. All is does is to combine reducers into a single rootReducer
// and export it - to be used in the store
import chatReducer from "./chat/reducer";
import loginReducer from "./auth/login/reducer";
import activateReducer from "./auth/activate/reducer";
import registerReducer from "./auth/register/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chat: chatReducer,
  login: loginReducer,
  register: registerReducer,
  activate: activateReducer,
});
export default rootReducer;
