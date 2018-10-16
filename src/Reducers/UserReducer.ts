import { handleActions, Reducer } from "redux-actions";

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
export const userReducer: Reducer<object, object> = handleActions(
  {},
  defaultState
);
