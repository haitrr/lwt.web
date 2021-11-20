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
  VIEWING_TERM_SET,
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

export interface TextEditDetail {}

export interface TextState {
  total: number;
  itemPerPage: number;
  page: number;
  filters: any;
  editDetail: TextEditDetail | undefined;
  texts: TextItem[];
  readingText: ReadingTextState | null;
}

export interface Term {
  learningLevel: string;
  index: number;
  id: number;
  count: number;
  meaning: string;
  content: string;
}

export interface ReadingTextState {
  id: any;
  title: string;
  terms: Term[];
  termIndexBegin: number;
  termLastBeginIndex: number;
  termsCountByLearningLevel: any;
  bookmark: number;
  termCount: number;
  termIndexEnd: number;
  viewingTermIndex: number;
  languageCode: string;
}

export interface TextItem {
  createdAt: string;
  termCount: number;
  progress: number;
  bookmark: number;
  counts: any;
  languageCode: string;
  title: string;
  id: number;
  processedTermCount: number;
}

const defaultState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: {},
  editDetail: undefined,
  readingText: null,
};

// @ts-ignore
const textReducer = handleActions<TextState, any>(
  {
    [TEXT_FETCHED]: (state, action) => {
      const { payload } = action;
      if (payload === null) {
        return { ...state, texts: [] };
      }
      return { ...payload };
    },
    [TERM_GET]: (state, action) => {
      if (!state.readingText) {
        throw new Error();
      }
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
          termLastBeginIndex: -1,
          terms: new Array(action.payload.termCount).fill(null),
        },
      };
    },
    [TERM_CREATED]: (state, action) => {
      const createdTerm = action.payload;
      if (!createdTerm || !state.readingText) {
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
      if (!editedTerm || !state.readingText) {
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
    [TEXT_TERM_SELECT]: (state, action) => {
      if (!state.readingText) return state;
      return {
        ...state,
        readingText: { ...state.readingText, bookmark: action.payload },
      };
    },

    [TERM_GET_MEANING]: (state, action) => {
      if (!action.payload || !state.readingText) {
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
      if (!action.payload || !state.readingText) {
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
      if (!state.readingText) {
        return state;
      }
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
    [TERM_INDEX_BEGIN_SET]: (state, action) => {
      if (!state.readingText) return state;
      let termLastBeginIndex = state.readingText.termIndexBegin;
      if (termLastBeginIndex === state.readingText.bookmark) {
        termLastBeginIndex += 1;
      }

      return {
        ...state,
        readingText: {
          ...state.readingText,
          termIndexBegin: action.payload,
          termLastBeginIndex,
        },
      };
    },
    [TERM_INDEX_END_SET]: (state, action) => {
      if (!state.readingText) return state;
      return {
        ...state,
        readingText: { ...state.readingText, termIndexEnd: action.payload },
      };
    },
    [TERM_COUNT_IN_TEXT]: (state, action) => {
      if (!state.readingText) {
        return state;
      }
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
      if (!action.payload || !state.readingText) {
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
    [VIEWING_TERM_SET]: (state, action) => {
      if (!state.readingText) {
        return state;
      }
      const { index } = action.payload;
      return {
        ...state,
        readingText: { ...state.readingText, viewingTermIndex: index },
      };
    },
  },
  defaultState
);

export default textReducer;
