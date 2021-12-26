import { handleActions } from 'redux-actions';
import { TERM_CREATED, TERM_EDITING_GET_MEANING, TERM_EDITING_MEANING_RESET, TERM_SET } from '../Actions/TermAction';

export interface TermState {
  editingTerm: number | null;
}

const defaultState: TermState = {
  editingTerm: null,
};
export default handleActions<TermState, any>(
  {
    [TERM_SET]: (state, action) => {
      return { ...state, editingTerm: action.payload };
    },
    [TERM_CREATED]: (state) => ({
      ...state,
      editingTerm: null,
    }),
    [TERM_EDITING_GET_MEANING]: (state, action) => ({
      ...state,
      editingTermMeaning: action.payload,
    }),
    [TERM_EDITING_MEANING_RESET]: (state) => ({
      ...state,
      editingTermMeaning: '',
    }),
  },
  defaultState,
);
