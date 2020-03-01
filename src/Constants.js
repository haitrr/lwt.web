/**
 * application constants
 */

export const API_ROOT = process.env.REACT_APP_API_ROOT;
export const DICTIONARY_API_ROOT = process.env.REACT_APP_DICTIONARY_API_ROOT;
export const LOGIN_API = `${API_ROOT}/user/login`;
export const LOGOUT_API = `${API_ROOT}/user/logout`;
export const TEXT_API = `${API_ROOT}/text`;
export const TOKEN_LOCAL_STORAGE_KEY = "token";
