import { handleActions } from "redux-actions";
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SETTING_GET
} from "../Actions/UserAction";
import { getCurrentUser } from "../Utilities/JwtTokenHelper";

const user = getCurrentUser();
/**
 * default state
 */
const defaultState =
  user != null ? { isLoggedIn: true, ...user } : { isLoggedIn: false };

/**
 * user reducer
 */
export const userReducer = handleActions(
  {
    [USER_LOGGED_IN]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [USER_LOGGED_OUT]: () => ({ isLoggedIn: false }),
    [USER_SETTING_GET]: (state, action) => ({
      ...state,
      setting: action.payload
    })
  },
  defaultState
);
