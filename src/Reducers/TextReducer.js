import { handleActions } from "redux-actions";
import {
  TEXT_DELETED,
  TEXT_EDIT_DETAIL_FETCHED,
  TEXT_FETCHED,
  TEXT_READ
} from "../Actions/TextAction";
import { TERM_CREATED, TERM_EDITED } from "../Actions/TermAction";

/**
 * text reducer
 */

const defaultState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: { languageId: "" },
  readingText: null
};

const textReducer = handleActions(
  {
    [TEXT_FETCHED]: (state, action) => {
      const { payload } = action;
      if (payload === null) {
        return { ...state, texts: [] };
      }
      return { ...payload };
    },
    [TEXT_READ]: (state, action) => ({ ...state, readingText: action.payload }),
    [TERM_CREATED]: (state, action) => {
      const createdTerm = action.payload;
      const { readingText } = state;
      const newTerms = readingText.terms.map(term => {
        if (term.content.toUpperCase() === createdTerm.content.toUpperCase()) {
          return { ...createdTerm, content: term.content };
        }
        return term;
      });
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TERM_EDITED]: (state, action) => {
      const editedTerm = action.payload;
      const { readingText } = state;
      const newTerms = readingText.terms.map(term => {
        if (term.id === editedTerm.id) {
          return { ...editedTerm, content: term.content };
        }
        return term;
      });
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TEXT_DELETED]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          texts: state.texts.filter(t => t.id !== action.payload)
        };
      }
      return state;
    },
    [TEXT_EDIT_DETAIL_FETCHED]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          editDetail: action.payload
        };
      }
      return state;
    }
  },
  defaultState
);

export default textReducer;

export const selectEditDetail = state => state.text.editDetail;
