import {createAction} from "redux-actions";
import api from "../Api";

const USER_LOGGED_IN = "USER_LOGGED_IN";

export const Login = createAction(USER_LOGGED_IN, async (credentials: object) => {
  try {
    await api.user.login(credentials);
    return true;
  } catch (e) {
    return false;
  }
});
