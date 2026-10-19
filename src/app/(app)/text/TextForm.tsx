'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { TextFormState } from '@/lib/texts';
import type { Language, TextEditDetail } from '@/lib/types';
import LanguageSelect from './LanguageSelect';

type Props = {
  languages: Language[];
  action: (prev: TextFormState, formData: FormData) => Promise<TextFormState>;
  initial?: TextEditDetail;
  submitLabel: string;
};

export default function TextForm({ languages, action, initial, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="stack">
      <LanguageSelect
        languages={languages}
        name="languageCode"
        defaultValue={initial?.languageCode ?? ''}
        emptyLabel="Choose a language"
        required
      />
      <input name="title" placeholder="Title" defaultValue={initial?.title} required />
      <textarea name="content" rows={16} placeholder="Text content" defaultValue={initial?.content} required />
      {state?.error && <p className="error">{state.error}</p>}
      <div className="row">
        <Link href="/text">Cancel</Link>
        <button type="submit" disabled={pending}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
