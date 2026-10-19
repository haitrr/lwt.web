import { apiFetch } from '@/lib/api';
import { editText } from '@/lib/texts';
import type { Language, TextEditDetail } from '@/lib/types';
import TextForm from '../../TextForm';

export const metadata = { title: 'Edit text' };

export default async function EditTextPage({ params }: PageProps<'/text/[textId]/edit'>) {
  const id = Number((await params).textId);
  const [languages, detail] = await Promise.all([
    apiFetch<Language[]>('/language'),
    apiFetch<TextEditDetail>(`/text/${id}/edit-details`),
  ]);
  return (
    <>
      <h1>Edit text</h1>
      <TextForm languages={languages} action={editText.bind(null, id)} initial={detail} submitLabel="Save" />
    </>
  );
}
