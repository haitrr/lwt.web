import { createAction } from "redux-actions";
import {
  loginAsync,
  logout,
  registerAsync,
  getSettingAsync,
  updateSettingAsync, Credentials, Setting
} from "../Apis/UserApi";

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_SETTING_GET = "USER_SETTING_GET";
export const USER_SETTING_UPDATE = "USER_SETTING_UPDATE";

/**
 * user login action.
 */
export const loginAction = createAction(USER_LOGGED_IN, async (credentials: Credentials) => {
  const user = await loginAsync(credentials);
  if (user !== undefined) {
    return {
      isLoggedIn: true,
      ...user
    };
  }
  return {};
});

export const logoutAction = createAction(USER_LOGGED_OUT, () => {
  logout();
});

export const getSettingAction = createAction(USER_SETTING_GET, async () => {
  try {
    const setting = await getSettingAsync();
    if (setting) {
      return setting;
    }
    return { languageSettings: [] };
  } catch (e) {
    // ignore
    return null;
  }
});

export const updateSettingAction = createAction(
  USER_SETTING_UPDATE,
  async (value : Setting)=> {
    try {
      await updateSettingAsync(value);
    } catch (e) {
      // ignore
    }
  }
);
export const registerAction = createAction(USER_REGISTERED, async (data: Credentials) => {
  await registerAsync(data);
});
