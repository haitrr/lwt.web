'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { apiFetch, ApiError } from './api';

export type TextFormState = { error?: string } | undefined;

function readText(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    languageCode: String(formData.get('languageCode') ?? ''),
    content: String(formData.get('content') ?? ''),
  };
}

function errorState(e: unknown): TextFormState {
  return { error: e instanceof ApiError ? e.message : 'Could not reach the server.' };
}

export async function createText(_prev: TextFormState, formData: FormData): Promise<TextFormState> {
  try {
    await apiFetch('/text', { method: 'POST', body: JSON.stringify(readText(formData)) });
  } catch (e) {
    return errorState(e);
  }
  redirect('/text');
}

export async function editText(id: number, _prev: TextFormState, formData: FormData): Promise<TextFormState> {
  try {
    await apiFetch(`/text/${id}`, { method: 'PUT', body: JSON.stringify(readText(formData)) });
  } catch (e) {
    return errorState(e);
  }
  redirect('/text');
}

export async function deleteText(id: number) {
  await apiFetch(`/text/${id}`, { method: 'DELETE' });
  revalidatePath('/text');
}
