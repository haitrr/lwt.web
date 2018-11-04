import { handleActions, Reducer } from "redux-actions";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "src/Actions/UserAction";

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
        ...action.payload
      };
    },
    [USER_LOGGED_OUT]: (state: any, action: any): any => {
      if (action.payload) {
        return defaultState;
      } else {
        return state;
      }
    }
  },
  defaultState
);
