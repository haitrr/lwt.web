/**
 * application constants
 */

export const API_ROOT =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:63489/api"
    : "https://lwt-server.herokuapp.com/api";
export const LOGIN_API = `${API_ROOT}/user/login`;
export const LOGOUT_API = `${API_ROOT}/user/logout`;
export const TEXT_API = `${API_ROOT}/text`;
export const TOKEN_LOCAL_STORAGE_KEY = "token";
