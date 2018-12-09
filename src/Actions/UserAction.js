import { createAction } from "redux-actions";
import { loginAsync, logout, registerAsync } from "../Apis/UserApi";

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

/**
 * user login action.
 */
export const loginAction = createAction(USER_LOGGED_IN, async credentials => {
  const user = await loginAsync(credentials);
  if (user !== undefined) {
    return {
      isLoggedIn: true,
      ...user
    };
  } else {
    return {};
  }
});

export const logoutAction = createAction(USER_LOGGED_OUT, () => {
  logout();
});

export const registerAction = createAction(USER_REGISTERED, async data => {
  try {
    await registerAsync(data);
  } finally {
    // ignore
  }
});
