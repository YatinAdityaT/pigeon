// This is the main store of redux. All the state is maintained here.
// in this file I am adding 2 middleware - logger and thunk. Also
// I am adding composeWithDevTools to see the state in the dev tools extension
// The store exported from here is used in the index.js (within the src directory)
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // for the dev tool
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const reduxStateSyncConfig = {
  blacklist: ["persist/PERSIST", "persist/REHYDRATE", "toast"], // don't sync toasts or persist
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["toast"], // don't persist toasts
};

// special custom middle ware to reset the application state
// once RESET is called (it is called when the user logs out)
function resetMiddleware() {
  return (next) => (reducer, initialState, enhancer) => {
    const enhanceReducer = (state, action) => {
      if (action.type === "RESET") {
        // reset state to _persist: state._persist. Removing this will break redux persist!
        // don't remove the toasts!
        state = { _persist: state._persist, toast: state.toast };
      }
      return reducer(state, action);
    };

    return next(enhanceReducer, initialState, enhancer);
  };
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer, // for redux persist - store the state in the localstorage so that it isn't lost at reload
  composeWithDevTools(
    applyMiddleware(
      logger, // logs the state in the console
      thunk, // for async actions
      createStateSyncMiddleware(reduxStateSyncConfig) // for redux state sync - syncs state across tabs
    ),
    resetMiddleware()
  )
);

initMessageListener(store);

const persistor = persistStore(store);
export { store, persistor };
