'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiFetch, ApiError } from './api';
import { TOKEN_COOKIE } from './config';

export type AuthState = { error?: string } | undefined;

function readCredentials(formData: FormData) {
  return {
    userName: String(formData.get('userName') ?? ''),
    password: String(formData.get('password') ?? ''),
  };
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  try {
    const { token } = await apiFetch<{ token: string }>('/user/login', {
      method: 'POST',
      body: JSON.stringify(readCredentials(formData)),
    });
    (await cookies()).set(TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  } catch (e) {
    return { error: e instanceof ApiError ? e.message : 'Could not reach the server.' };
  }
  redirect('/');
}

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  try {
    await apiFetch('/user', { method: 'POST', body: JSON.stringify(readCredentials(formData)) });
  } catch (e) {
    return { error: e instanceof ApiError ? e.message : 'Could not reach the server.' };
  }
  redirect('/login');
}

export async function logout() {
  (await cookies()).delete(TOKEN_COOKIE);
  redirect('/login');
}
