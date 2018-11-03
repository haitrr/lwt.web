import { handleActions, Reducer } from "redux-actions";
import { USER_LOGGED_IN } from "src/Actions/UserAction";

/**
 * default state
 */
const defaultState: object = {
  isLoggedIn: false,
  userName: null
};

/**
 * user reducer
 */
export const userReducer: Reducer<any, any> = handleActions(
  {
    [USER_LOGGED_IN]: (state: any, action: any): any => {
      return {
        ...state,
        isLoggedIn: action.payload
      };
    }
  },
  defaultState
);
