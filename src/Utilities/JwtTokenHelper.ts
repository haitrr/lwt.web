import jwt_decode from 'jwt-decode';
import { TOKEN_LOCAL_STORAGE_KEY } from '../Constants';

export interface UserData {
  id: number;
  userName: string;
}

/**
 * get the current user from token
 */
export function getCurrentUser(): UserData | null {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token != null) {
    return jwt_decode(token);
  } else {
    return null;
  }
}
