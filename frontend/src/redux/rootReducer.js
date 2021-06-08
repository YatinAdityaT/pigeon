import chatReducer from "./currentChat/chatReducer";
import userReducer from "./currentUser/userReducer";
import { combineReducer } from "redux";

const rootReducer = combineReducer({ chat: chatReducer, user: userReducer });
export default rootReducer;
