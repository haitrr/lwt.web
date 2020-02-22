import { handleActions } from "redux-actions";
import {
  TEXT_DELETED,
  TEXT_EDIT_DETAIL_FETCHED,
  TEXT_FETCHED,
  TEXT_READ,
  TEXT_TERM_SELECT
} from "../Actions/TextAction";
import { TERM_CREATED, TERM_EDITED, TERM_GET } from "../Actions/TermAction";

/**
 * text reducer
 */

const defaultState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: {},
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
    [TERM_GET]: (state, action) => {
      const terms = [...state.readingText.terms];
      terms[action.payload.index] = {
        ...action.payload.term,
        content: terms[action.payload.index].content
      };
      return {
        ...state,
        readingText: {
          ...state.readingText,
          terms
        }
      };
    },
    [TEXT_READ]: (state, action) => ({ ...state, readingText: action.payload }),
    [TERM_CREATED]: (state, action) => {
      const createdTerm = action.payload;
      if (!createdTerm) {
        return state;
      }
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
      if (!editedTerm) {
        return state;
      }
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
    },
    [TEXT_TERM_SELECT]: (state, action) => ({
      ...state,
      readingText: { ...state.readingText, bookmark: action.payload }
    })
  },
  defaultState
);

export default textReducer;

export const selectEditDetail = state => state.text.editDetail;
