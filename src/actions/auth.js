import { createAction } from "redux-actions";
import types from "../types";
import api from "../api";

export const login = createAction(
  types.USER_LOGGED_IN,
  (credentials) => api.user.login(credentials)
);