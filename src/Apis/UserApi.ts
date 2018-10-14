import { API_ROOT } from 'src/Constants';
import { IUserLoginModel } from 'src/Interfaces/IUserLoginModel';
import { IUserRegisterModel } from 'src/Interfaces/IUserRegisterModel';
import { postAsync } from 'src/Utilities/HttpRequest';

/**
 * login a user async
 * @param data login data
 */
export async function loginAsync(data: IUserLoginModel): Promise<boolean> {
  try {
    await postAsync(`${API_ROOT}/user/login`, data)

    return true;
  }
  catch (e) {
    return false;
  }
}

export async function registerAsync(data: IUserRegisterModel): Promise<void> {
  try {
    await postAsync(`${API_ROOT}/user/register`, data);
  } catch(e) {
    // ignore
  }
}
