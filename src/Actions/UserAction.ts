import { Action, ActionFunction1, createAction } from "redux-actions";
import { loginAsync, registerAsync } from "src/Apis/UserApi";
import { IUserLoginModel } from "src/Interfaces/IUserLoginModel";
import { IUserRegisterModel } from "src/Interfaces/IUserRegisterModel";

export const USER_LOGGED_IN: string = "USER_LOGGED_IN";
export const USER_REGISTERED: string = "USER_REGISTERED";

/**
 * user login action.
 */
export const loginAction: any = createAction(
  USER_LOGGED_IN,
  async (credentials: IUserLoginModel) => {
    return loginAsync(credentials);
  }
);

export const registerAction: ActionFunction1<
  IUserRegisterModel,
  Action<Promise<void>>
> = createAction(USER_REGISTERED, async (data: IUserRegisterModel) => {
  try {
    await registerAsync(data);
  } finally {
    // ignore
  }
});
