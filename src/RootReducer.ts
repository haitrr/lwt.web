import { combineReducers } from "redux";
import { languageReducer } from "./Reducers/LanguageReducer";
import textReducer, { TextState } from "./Reducers/TextReducer";
import {UserLanguageSetting, userReducer} from "./Reducers/UserReducer";
import termReducer, {TermState} from "./Reducers/TermReducer";

export interface Language {
  code: string;
  name: string;
  speakCode: string;
}

export interface LanguageState {
  currentLanguage: string;
  languages: Language[];
}

interface UserSetting {
  languageSettings: UserLanguageSetting[]
}

export interface UserState {
  isLoggedIn: boolean;
  userName: string;
  setting: UserSetting;
}

export interface RootState {
  language: LanguageState;
  text: TextState;
  user: UserState;
  term: TermState;
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
