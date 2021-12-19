import { createAction } from "redux-actions";
import {
  registerAsync,
  Credentials,
} from "../Apis/UserApi";

export const USER_REGISTERED = "USER_REGISTERED";

export const registerAction = createAction(USER_REGISTERED, async (data: Credentials) => {
  await registerAsync(data);
});
