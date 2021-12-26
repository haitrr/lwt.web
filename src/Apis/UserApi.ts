import { API_ROOT, TOKEN_LOCAL_STORAGE_KEY } from '../Constants';
import { getAsync, postAsync, putAsync } from '../Utilities/HttpRequest';
import { UserLanguageSetting } from '../Reducers/UserReducer';

export function getSettingAsync() {
  return getAsync(`${API_ROOT}/user/setting`);
}

export interface Setting {
  languageSettings: UserLanguageSetting[];
}

export function updateSettingAsync(settings: Setting) {
  return putAsync(`${API_ROOT}/user`, 'setting', settings);
}

export interface Credentials {
  userName: string;
  password: string;
}

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(data: Credentials): Promise<string> {
  const result = await postAsync(`${API_ROOT}/user/login`, data);
  const { token } = result;

  return token;
}

export function logout() {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export interface RegisterData {
  userName: string;
  password: string;
}

export async function registerAsync(data: RegisterData) {
  await postAsync(`${API_ROOT}/user`, data);
}
