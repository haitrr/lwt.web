import { toast } from 'react-toastify';
import { getAsync, postAsync, putAsync } from '../Utilities/HttpRequest';
import { API_ROOT, DICTIONARY_API_ROOT, TERM_API } from '../Constants';
import { Term } from '../Reducers/TextReducer';

export async function getTermAsync(id: number) {
  return getAsync(`${API_ROOT}/term/${id}`);
}

export async function getTextMeaningAsync(text: string, from: string, to: string) {
  return getAsync(
    `${DICTIONARY_API_ROOT}/dictionary/${text}`,
    {
      fromLang: from,
      toLang: to,
    },
    (res: Response) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 404) {
        toast.info('Meaning not found in dictionary', { autoClose: 1000 });
        return Promise.resolve(null);
      }
      throw res;
    },
  );
}

export async function createTermAsync(term: Term) {
  return postAsync(`${API_ROOT}/term`, term);
}

export async function editTermAsync(term: Term) {
  return putAsync(`${API_ROOT}/term`, term.id, term);
}

export async function getTermMeaningAsync(id: number) {
  return getAsync(`${API_ROOT}/term/${id}/meaning`);
}

export async function getTermCountByLanguages(): Promise<{ [key: string]: number }> {
  return getAsync(`${TERM_API}/count`);
}

export async function getTermsCountByLearningLevels(): Promise<{ [key: string]: number }> {
  return getAsync(`${TERM_API}/countByLearningLevel`);
}
