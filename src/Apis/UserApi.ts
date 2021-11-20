import decode from "jwt-decode";
import { API_ROOT, TOKEN_LOCAL_STORAGE_KEY } from "../Constants";
import { getAsync, postAsync, putAsync } from "../Utilities/HttpRequest";
import {UserData} from "../Utilities/JwtTokenHelper";

export function getSettingAsync() {
  return getAsync(`${API_ROOT}/user/setting`);
}

export interface Setting {

}

export function updateSettingAsync(settings: Setting) {
  return putAsync(`${API_ROOT}/user`, "setting", settings);
}

export interface Credentials {

}

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(data: Credentials): Promise<UserData| undefined> {
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

export interface RegisterData {

}

export async function registerAsync(data: RegisterData) {
  await postAsync(`${API_ROOT}/user`, data);
}
