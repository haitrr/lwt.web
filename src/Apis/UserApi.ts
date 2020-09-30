import decode from "jwt-decode";
import { API_ROOT, TOKEN_LOCAL_STORAGE_KEY } from "../Constants";
import { getAsync, postAsync, putAsync } from "../Utilities/HttpRequest";

export function getSettingAsync() {
  return getAsync(`${API_ROOT}/user/setting`);
}

export interface LanguageSetting {
  languageCode: string;
  dictionaryLanguageCode: string;
}

export interface UserSettingUpdateModel {
  languageSettings: LanguageSetting[];
}

export function updateSettingAsync(settings: UserSettingUpdateModel) {
  return putAsync(`${API_ROOT}/user`, "setting", settings);
}

export interface LoginData {}

export interface JwtData {}

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(data: LoginData): Promise<JwtData | null> {
  try {
    const result = await postAsync(`${API_ROOT}/user/login`, data);
    const { token } = result;
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);

    return decode(token);
  } catch (e) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export interface RegisterData {}

export async function registerAsync(data: RegisterData) {
  await postAsync(`${API_ROOT}/user`, data);
}
