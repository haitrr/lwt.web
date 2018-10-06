import {handleActions} from "redux-actions";

const defaultState = {
  isLoggedIn: false,
  userName: null,
};

const UserReducer = handleActions(
  {},
  defaultState
);

export default UserReducer
