import { combineReducers } from "redux";
import { languageReducer } from "./Reducers/LanguageReducer";
import textReducer, { TextState } from "./Reducers/TextReducer";
import userReducer, { UserState } from "./Reducers/UserReducer";
import termReducer from "./Reducers/TermReducer";

export interface RootState {
  user: UserState;
  language: any;
  text: TextState;
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
