import { handleActions, ReducerMap, Action } from "redux-actions";
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SETTING_GET,
} from "../Actions/UserAction";
import { getCurrentUser } from "../Utilities/JwtTokenHelper";
import { LanguageSetting } from "../Apis/UserApi";

const user = getCurrentUser();
/**
 * default state
 */
export interface UserSetting {
  languageSettings: LanguageSetting[];
}
export interface UserState {
  isLoggedIn: boolean;
  setting: UserSetting;
}
const defaultState: UserState =
  user != null ? { isLoggedIn: true, ...user } : { isLoggedIn: false };

export interface UserLoggedInActionPayload {}

/**
 * user reducer
 */
export default handleActions(
  {
    [USER_LOGGED_IN]: (
      state: UserState,
      action: Action<UserLoggedInActionPayload>
    ) => ({
      ...state,
      ...action.payload,
    }),
    [USER_LOGGED_OUT]: () => ({ isLoggedIn: false }),
    [USER_SETTING_GET]: (state: UserState, action: Action<UserSetting>) => ({
      ...state,
      setting: action.payload,
    }),
  } as ReducerMap<UserState, any>,
  defaultState
);
