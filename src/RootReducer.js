import { combineReducers } from "redux";
import { languageReducer } from "./Reducers/LanguageReducer";
import textReducer from "./Reducers/TextReducer";
import { userReducer } from "./Reducers/UserReducer";
import termReducer from "./Reducers/TermReducer";

/**
 * root reducer
 */
export default combineReducers({
  user: userReducer,
  language: languageReducer,
  text: textReducer,
  term: termReducer
});
