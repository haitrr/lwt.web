import jwt_decode from 'jwt-decode';
import useLocalStorage from "./useLocalStorage"
import { TOKEN_LOCAL_STORAGE_KEY } from "../Constants";
 
export interface User {
    id: number;
    userName: string;
}

const useUser = (): [User|null, () => void] => {
    const [token, setToken] = useLocalStorage<string | null>(TOKEN_LOCAL_STORAGE_KEY, null);
    const logout = () => {
        setToken(null);
    }

    if (token != null) {
      return [jwt_decode<User>(token), logout];
    } else {
      return [null, logout];
    }
}

export default useUser;