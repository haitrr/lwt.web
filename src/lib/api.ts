import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_ROOT, TOKEN_COOKIE } from './config';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/**
 * Call the LWT API from the server, forwarding the user's token from the session cookie.
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;
  const res = await fetch(`${API_ROOT}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(token ? { Authorization: `bearer ${token}` } : {}),
      ...init.headers,
    },
    cache: 'no-store',
  });
  if (res.status === 401) {
    redirect('/login');
  }
  if (!res.ok) {
    let message = res.statusText;
    try {
      message = (await res.json()).Message ?? message;
    } catch {}
    throw new ApiError(res.status, message);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}
