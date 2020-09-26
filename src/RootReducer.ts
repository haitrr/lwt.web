import { combineReducers } from "redux";
import { languageReducer } from "./Reducers/LanguageReducer";
import textReducer from "./Reducers/TextReducer";
import { userReducer } from "./Reducers/UserReducer";
import termReducer from "./Reducers/TermReducer";

export interface RootState {
  user: any;
  language: any;
  text: any;
  term: any;
}

/**
 * root reducer
 */
export default combineReducers<RootState>({
  user: userReducer,
  language: languageReducer,
  text: textReducer,
  term: termReducer,
});
