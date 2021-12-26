import { combineReducers } from 'redux';
import textReducer, { TextState } from './Reducers/TextReducer';
import { UserLanguageSetting } from './Reducers/UserReducer';
import termReducer, { TermState } from './Reducers/TermReducer';

export interface Language {
  code: string;
  name: string;
  speakCode: string;
}

export interface UserSetting {
  languageSettings: UserLanguageSetting[];
}

export interface UserState {
  userName: string;
  setting: UserSetting;
}

export interface RootState {
  text: TextState;
  user: UserState;
  term: TermState;
}

/**
 * root reducer
 */
export default combineReducers({
  text: textReducer,
  term: termReducer,
});
