import { handleActions } from "redux-actions";
import {
  USER_LOGGED_OUT,
  USER_SETTING_GET
} from "../Actions/UserAction";
import { getCurrentUser } from "../Utilities/JwtTokenHelper";

export interface UserLanguageSetting {
  languageCode: string;
  dictionaryLanguageCode: string;
}

export interface UserState {
  isLoggedIn: boolean;
  languageSettings?: UserLanguageSetting[]
  id?: number;
  userName?: string;
}

const user = getCurrentUser();
/**
 * default state
 */
const defaultState: UserState =
  user != null ? { isLoggedIn: true, ...user } : { isLoggedIn: false };

/**
 * user reducer
 */
export const userReducer = handleActions(
  {
    [USER_LOGGED_OUT]: () => ({ isLoggedIn: false }),
    [USER_SETTING_GET]: (state, action) => ({
      ...state,
      setting: action.payload
    })
  },
  defaultState
);
