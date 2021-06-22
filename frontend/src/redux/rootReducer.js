import chatReducer from "./currentChat/chatReducer";
import userReducers from "./currentUser/userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ chat: chatReducer, user: userReducers });
export default rootReducer;
