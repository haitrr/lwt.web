import decode from "jwt-decode";
import { API_ROOT, TOKEN_LOCAL_STORAGE_KEY } from "../Constants";
import { getAsync, postAsync, putAsync } from "../Utilities/HttpRequest";

export function getSettingAsync() {
  return getAsync(`${API_ROOT}/user/setting`);
}

export function updateSettingAsync(settings) {
  return putAsync(`${API_ROOT}/user`, "setting", settings);
}

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(data) {
  try {
    const result = await postAsync(`${API_ROOT}/user/login`, data);
    const { token } = result;
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);

    return decode(token);
  } catch (e) {
    return undefined;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export async function registerAsync(data) {
  await postAsync(`${API_ROOT}/user`, data);
}
