// this is the main store of redux. All the state is maintained here.
// in this file I am adding 2 middleware - logger and thunk. Also
// I am adding composeWithDevTools to see the state in the dev tools extension
// The store exported from here is used in the index.js (within the src directory)
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
export default store;
