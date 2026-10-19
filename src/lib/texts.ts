'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { toFormState, type FormState } from './actionState';
import { requireSession } from '@/server/auth/session';
import * as texts from '@/server/texts';

export type TextFormState = FormState;

function readText(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    languageCode: String(formData.get('languageCode') ?? ''),
    // Form posts send textarea line breaks as \r\n; the old app stored the textarea value (\n).
    content: String(formData.get('content') ?? '').replace(/\r\n/g, '\n'),
  };
}

export async function createText(_prev: TextFormState, formData: FormData): Promise<TextFormState> {
  const session = await requireSession();
  const input = readText(formData);
  const state = await toFormState(() => texts.createText(session, input), input);
  if (state) return state;
  redirect('/text');
}

export async function editText(id: number, _prev: TextFormState, formData: FormData): Promise<TextFormState> {
  const session = await requireSession();
  const input = readText(formData);
  const state = await toFormState(() => texts.editText(id, session.userId, input), input);
  if (state) return state;
  redirect('/text');
}

export async function deleteText(id: number) {
  const session = await requireSession();
  await texts.deleteText(id, session.userId);
  revalidatePath('/text');
}
