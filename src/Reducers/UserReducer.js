import { handleActions } from "redux-actions";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../Actions/UserAction";
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
    [USER_LOGGED_IN]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    [USER_LOGGED_OUT]: () => {
      return { isLoggedIn: false };
    }
  },
  defaultState
);
