import { handleActions } from "redux-actions";
import { TEXT_FETCHED, TEXT_READ } from "../Actions/TextAction";
import { TERM_CREATED } from "../Actions/TermAction";

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

export const textReducer = handleActions(
  {
    [TEXT_FETCHED]: (state, action) => {
      const { payload } = action;
      if (payload === null) {
        return { ...state, texts: [] };
      } else {
        return { ...payload };
      }
    },
    [TEXT_READ]: (state, action) => {
      return { ...state, readingText: action.payload };
    },
    [TERM_CREATED]: (state, action) => {
      const createdTerm = action.payload;
      const readingText = state.readingText;
      const newTerms = readingText.terms.map(term => {
        if (term.content === createdTerm.content) {
          return createdTerm;
        }
        return term;
      });
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    }
  },
  defaultState
);
