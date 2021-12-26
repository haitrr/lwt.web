import { createAction } from 'redux-actions';
import { toast } from 'react-toastify';
import {
  createTermAsync,
  editTermAsync,
  getTermAsync,
  getTermMeaningAsync,
  getTextMeaningAsync,
} from '../Apis/TermApi';
import { Term } from '../Reducers/TextReducer';

export const TERM_GET = 'TERM_GET';
export const TERM_SET = 'TERM_SET';
export const TERM_CREATED = 'TERM_CREATED';
export const TERM_EDITED = 'TERM_EDITED';
export const TERM_EDITING_GET_MEANING = 'TERM_EDITING_GET_MEANING';
export const TERM_EDITING_MEANING_RESET = 'TERM_EDITING_MEANING_RESET';
export const TERM_GET_MEANING = 'TERM_GET_MEANING';
export const TERM_DICTIONARY = 'TERM_DICTIONARY';

export const getTermAction = createAction(TERM_GET, async (id: number, index: number) => {
  try {
    return { term: await getTermAsync(id), index };
  } catch (e: any) {
    toast.error(`Can't get term, ${e.message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return null;
  }
});

export const setEditingTermAction = createAction(TERM_SET, (term: Term | null) => term);
export const getEditingTermMeaningAction = createAction(
  TERM_EDITING_GET_MEANING,
  async (content: string, from: string, to: string) => {
    const rs = await getTextMeaningAsync(content.toLowerCase(), from, to);
    if (!rs) {
      return '';
    }
    return rs.meaning;
  },
);

export const dictionaryTermMeaningAction = createAction(
  TERM_DICTIONARY,
  async (content: string, from: string, to: string, index: number) => {
    const rs = await getTextMeaningAsync(content.toLowerCase(), from, to);
    if (!rs) {
      return { meaning: '', index };
    }
    return { meaning: rs.meaning, index };
  },
);

export const resetEditingTermMeaningAction = createAction(TERM_EDITING_MEANING_RESET);

export const createTermAction = createAction(TERM_CREATED, async (term: Term) => {
  try {
    const newTerm = { ...term };
    newTerm.id = await createTermAsync(term);
    toast.success('Term is saved');
    return newTerm;
  } catch (e: any) {
    toast.error(`Can't create term ${e.message}`);
    return null;
  }
});
export const editTermAction = createAction(TERM_EDITED, async (term: Term) => {
  try {
    await editTermAsync(term);
    toast.success('Term is saved', { autoClose: 1000 });
    return term;
  } catch (e: any) {
    toast.error(`Can't edit term ${e.message}`);
    return null;
  }
});
export const getTermMeaningAction = createAction(TERM_GET_MEANING, async (term: Term, index: number) => {
  try {
    const termMeaning = await getTermMeaningAsync(term.id);
    return { termMeaning, index };
  } catch (e: any) {
    toast.error(`Can't get term mearning ${e.message}`);
    return null;
  }
});
