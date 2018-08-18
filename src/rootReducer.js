import { combineReducers } from "redux";
import types from "./types";

export default combineReducers({
  user: (state, action) => {
    if (action === types.USER_LOGGED_IN) {
      console.log("Hola");
    }
    return {};
  }
});

