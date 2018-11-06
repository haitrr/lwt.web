import * as decode from "jwt-decode";
import { API_ROOT, TOKEN_LOCAL_STORAGE_KEY } from "src/Constants";
import { IUser } from "src/Interfaces/IUser";
import { IUserLoginModel } from "src/Interfaces/IUserLoginModel";
import { IUserRegisterModel } from "src/Interfaces/IUserRegisterModel";
import { postAsync } from "src/Utilities/HttpRequest";

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(
  data: IUserLoginModel
): Promise<IUser | undefined> {
  try {
    const result: any = await postAsync<any>(`${API_ROOT}/user/login`, data);
    const token: string = result.token;
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);

    return decode<IUser>(token);
  } catch (e) {
    return undefined;
  }
}

export function logout(): void {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export async function registerAsync(data: IUserRegisterModel): Promise<void> {
  try {
    await postAsync(`${API_ROOT}/user/register`, data);
  } catch (e) {
    // ignore
  }
}
