import { apiFetch } from '@/lib/api';
import { createText } from '@/lib/texts';
import type { Language } from '@/lib/types';
import TextForm from '../TextForm';

export const metadata = { title: 'Add text' };

export default async function NewTextPage() {
  const languages = await apiFetch<Language[]>('/language');
  return (
    <>
      <h1>Add text</h1>
      <TextForm languages={languages} action={createText} submitLabel="Add" />
    </>
  );
}
