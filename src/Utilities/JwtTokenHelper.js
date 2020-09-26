import jwtDecode from "jwt-decode";
import { TOKEN_LOCAL_STORAGE_KEY } from "../Constants";

/**
 * get the current user from token
 */
export function getCurrentUser() {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token != null) {
    return jwtDecode(token);
  }
  return null;
}
