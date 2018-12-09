import decode from "jwt-decode";
import { API_ROOT, TOKEN_LOCAL_STORAGE_KEY } from "../Constants";
import { postAsync } from "../Utilities/HttpRequest";

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(data) {
  try {
    const result = await postAsync(`${API_ROOT}/user/login`, data);
    const token = result.token;
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
  try {
    await postAsync(`${API_ROOT}/user/register`, data);
  } catch (e) {
    // ignore
  }
}
