import { combineReducers } from "redux";
import { languageReducer } from "./Reducers/LanguageReducer";
import textReducer, { TextState } from "./Reducers/TextReducer";
import { userReducer } from "./Reducers/UserReducer";
import termReducer from "./Reducers/TermReducer";

export interface Language {
  code: string;
  name: string;
}

export interface LanguageState {
  currentLanguage: string;
  languages: Language[];
}

export interface UserState {
  isLoggedIn: boolean;
  userName: string;
}

export interface RootState {
  language: LanguageState;
  text: TextState;
  user: UserState;
}

/**
 * root reducer
 */
export default combineReducers({
  user: userReducer,
  language: languageReducer,
  text: textReducer,
  term: termReducer,
});
