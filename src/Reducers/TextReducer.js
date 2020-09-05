import { handleActions } from "redux-actions";
import {
  TERM_COUNT_LOADED,
  TERM_INDEX_BEGIN_SET,
  TERM_INDEX_END_SET,
  TEXT_DELETED,
  TEXT_EDIT_DETAIL_FETCHED,
  TEXT_FETCHED,
  TEXT_READ,
  TEXT_TERM_LOADED,
  TEXT_TERM_SELECT,
  READING_TEXT_TERMS_COUNT_LOADED,
  TERM_COUNT_IN_TEXT,
  TEXT_TERM_COUNT_GET,
  TEXT_PROCESSED_TERM_COUNT_GET,
} from "../Actions/TextAction";
import {
  TERM_CREATED,
  TERM_DICTIONARY,
  TERM_EDITED,
  TERM_GET,
  TERM_GET_MEANING,
} from "../Actions/TermAction";

/**
 * text reducer
 */

const defaultState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: {},
  readingText: null,
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
        ...terms[action.payload.index],
        ...action.payload.term,
        content: terms[action.payload.index].content,
      };
      return {
        ...state,
        readingText: {
          ...state.readingText,
          terms,
        },
      };
    },
    [TEXT_READ]: (state, action) => {
      if (action.error) {
        return state;
      }
      return {
        ...state,
        readingText: {
          ...action.payload,
          termIndexEnd: action.payload.bookmark ?? 0,
          termIndexBegin: action.payload.bookmark ?? 0,
          terms: new Array(action.payload.termCount).fill(null),
        },
      };
    },
    [TERM_CREATED]: (state, action) => {
      const createdTerm = action.payload;
      if (!createdTerm) {
        return state;
      }
      const { readingText } = state;
      const newTerms = [...readingText.terms];
      const { termIndexBegin, termIndexEnd } = state.readingText;
      for (let i = termIndexBegin; i <= termIndexEnd; i += 1) {
        if (newTerms[i]) {
          if (
            newTerms[i].content.toUpperCase() ===
            createdTerm.content.toUpperCase()
          ) {
            newTerms[i] = {
              ...createdTerm,
              content: newTerms[i].content,
              index: i,
            };
          }
        }
      }
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TERM_EDITED]: (state, action) => {
      const editedTerm = action.payload;
      if (!editedTerm) {
        return state;
      }
      const { readingText } = state;
      const newTerms = [...readingText.terms];
      const { termIndexBegin, termIndexEnd } = readingText;
      for (let i = termIndexBegin; i <= termIndexEnd; i += 1) {
        if (newTerms[i]) {
          if (
            newTerms[i].content.toUpperCase() ===
            editedTerm.content.toUpperCase()
          ) {
            newTerms[i] = {
              ...editedTerm,
              content: newTerms[i].content,
              index: i,
            };
          }
        }
      }
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TEXT_DELETED]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          texts: state.texts.filter((t) => t.id !== action.payload),
        };
      }
      return state;
    },
    [TEXT_EDIT_DETAIL_FETCHED]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          editDetail: action.payload,
        };
      }
      return state;
    },
    [TEXT_TERM_SELECT]: (state, action) => ({
      ...state,
      readingText: { ...state.readingText, bookmark: action.payload },
    }),

    [TERM_GET_MEANING]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      const { index, termMeaning } = action.payload;

      const { terms } = state.readingText;
      terms[index] = { ...terms[index], meaning: termMeaning.meaning };
      return { ...state, readingText: { ...state.readingText, terms } };
    },
    [TERM_COUNT_LOADED]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      const { id, counts } = action.payload;
      const index = state.texts.findIndex((t) => t.id === id);
      if (index < 0) {
        return state;
      }
      const newText = { ...state.texts[index], counts };
      const newTexts = [...state.texts];
      newTexts[index] = newText;
      return { ...state, texts: newTexts };
    },
    [READING_TEXT_TERMS_COUNT_LOADED]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      const { counts } = action.payload;
      return {
        ...state,
        readingText: {
          ...state.readingText,
          termsCountByLearningLevel: counts,
        },
      };
    },
    [TEXT_TERM_LOADED]: (state, action) => {
      const { terms, begin, end } = action.payload;

      const newTerms = [...state.readingText.terms];
      for (let i = begin; i < end + 1; i += 1) {
        newTerms[i] = { ...terms[i - begin], ...newTerms[i] };
      }
      return {
        ...state,
        readingText: {
          ...state.readingText,
          terms: newTerms,
        },
      };
    },
    [TERM_INDEX_BEGIN_SET]: (state, action) => ({
      ...state,
      readingText: { ...state.readingText, termIndexBegin: action.payload },
    }),
    [TERM_INDEX_END_SET]: (state, action) => ({
      ...state,
      readingText: { ...state.readingText, termIndexEnd: action.payload },
    }),
    [TERM_COUNT_IN_TEXT]: (state, action) => {
      const { count, termId } = action.payload;
      const { readingText } = state;
      const newTerms = [...readingText.terms];
      const { termIndexBegin, termIndexEnd } = readingText;
      for (let i = termIndexBegin; i <= termIndexEnd; i += 1) {
        if (newTerms[i]) {
          if (newTerms[i].id === termId) {
            newTerms[i] = { ...newTerms[i], count };
          }
        }
      }
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TERM_DICTIONARY]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      const { index, meaning } = action.payload;

      const { terms } = state.readingText;
      terms[index] = { ...terms[index], meaning };
      return { ...state, readingText: { ...state.readingText, terms } };
    },
    [TEXT_TERM_COUNT_GET]: (state, action) => {
      const { termCount, textId } = action.payload;
      const newTexts = state.texts.map((t) =>
        t.id === textId ? { ...t, termCount } : t
      );
      return { ...state, texts: newTexts };
    },
    [TEXT_PROCESSED_TERM_COUNT_GET]: (state, action) => {
      const { processedTermCount, textId } = action.payload;
      const newTexts = state.texts.map((t) =>
        t.id === textId ? { ...t, processedTermCount } : t
      );
      return { ...state, texts: newTexts };
    },
  },
  defaultState
);

export default textReducer;

export const selectEditDetail = (state) => state.text.editDetail;
