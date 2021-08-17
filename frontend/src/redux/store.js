// This is the main store of redux. All the state is maintained here.
// in this file I am adding 2 middleware - logger and thunk. Also
// I am adding composeWithDevTools to see the state in the dev tools extension
// The store exported from here is used in the index.js (within the src directory)
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["chat"],
};

function resetMiddleware() {
  return (next) => (reducer, initialState, enhancer) => {
    const enhanceReducer = (state, action) => {
      if (action.type === "RESET") {
        // state = action["state"];
        // console.log("state: ", state);
        state = { _persist: state._persist };
      }
      return reducer(state, action);
    };

    return next(enhanceReducer, initialState, enhancer);
  };
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(logger, thunk), resetMiddleware())
);

const persistor = persistStore(store);
export { store, persistor };
