// Base URL of the existing LWT .NET API (haitrr/lwt), e.g. https://lwt-api.example.com/api
export const API_ROOT = process.env.LWT_API_ROOT ?? 'http://localhost:5000/api';

// httpOnly cookie holding the JWT issued by POST /api/user/login
export const TOKEN_COOKIE = 'lwt_token';
