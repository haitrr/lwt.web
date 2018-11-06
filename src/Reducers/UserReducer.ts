import { handleActions, Reducer } from "redux-actions";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "src/Actions/UserAction";
import { IUser } from "src/Interfaces/IUser";
import { getCurrentUser } from "src/Utilities/JwtTokenHelper";

const user: IUser | null = getCurrentUser();
/**
 * default state
 */
const defaultState: object =
  user != null ? { isLoggedIn: true, ...user } : { isLoggedIn: false };

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
    [USER_LOGGED_OUT]: (): any => {
      return { isLoggedIn: false };
    }
  },
  defaultState
);
