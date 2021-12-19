import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import useLocalStorage from "./useLocalStorage"
import { TOKEN_LOCAL_STORAGE_KEY } from "../Constants";

export interface User {
    id: number;
    userName: string;
}

const useUser = () => {
    const [token, setToken] = useLocalStorage(TOKEN_LOCAL_STORAGE_KEY, null);
    const [user, setUser] = useState<User | null>(() => {
        if (token) {

            return jwt_decode(token);
        }
        return null
    });
    useEffect(() => {
        if (token) {
            setUser(jwt_decode(token));
        }
        else {
            console.log("wtf")
            setUser(null)
        }
    }, [token])

    const logout = () => {
        setToken(null);
    }

    const login = (token: string) => {
        setToken(token)
    }

    return [user, logout, login] as const;
}

export default useUser;