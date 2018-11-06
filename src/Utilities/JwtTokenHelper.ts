import * as jwt_decode from "jwt-decode";
import { TOKEN_LOCAL_STORAGE_KEY } from "src/Constants";
import { IUser } from "src/Interfaces/IUser";

/**
 * get the current user from token
 */
export function getCurrentUser(): IUser | null {
  const token: string | null = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token != null) {
    return jwt_decode<IUser>(token);
  } else {
    return null;
  }
}
