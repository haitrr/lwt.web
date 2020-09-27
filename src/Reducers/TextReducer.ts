import { Action, handleActions, ReducerMap } from "redux-actions";
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
  TEXT_PROCESSED_INDEX_GET,
} from "../Actions/TextAction";
import {
  TERM_CREATED,
  TERM_DICTIONARY,
  TERM_EDITED,
  TERM_GET,
  TERM_GET_MEANING,
} from "../Actions/TermAction";
import { RootState } from "../RootReducer";

/**
 * text reducer
 */

export interface TextTermState {
  learningLevel: string;
  indexFrom: number;
  textTermId: number;
  id: number;
  content: string;
  meaning: string;
  count: number;
}

export interface ReadingTextState {
  length: number;
  termCount: number;
  title: string;
  languageCode: string;
  id: number;
  terms: (TextTermState | null)[];
  bookmark: number;
  termIndexBegin: number;
  termIndexEnd: number;
}

export interface TextState {
  texts: any[];
  page: number;
  itemPerPage: number;
  total: number;
  filters: any;
  readingText: ReadingTextState | null;
  editDetail: any;
}

export interface TextReadActionPayload {
  bookmark: number;
}

const defaultState: TextState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: {},
  readingText: null,
  editDetail: null,
};

const textReducer = handleActions(
  {
    [TEXT_FETCHED]: (state: TextState, action: Action<any>) => {
      const { payload } = action;
      if (payload === null) {
        return { ...state, texts: [] };
      }
      return { ...payload };
    },
    [TERM_GET]: (state: TextState, action: Action<any>) => {
      if (state.readingText === null) {
        throw new Error();
      }
      const terms = [...state.readingText.terms];
      const term = terms[action.payload.index];
      if (term === null) throw new Error();
      terms[action.payload.index] = {
        ...terms[action.payload.index],
        ...action.payload.term,
        content: term.content,
      };
      return {
        ...state,
        readingText: {
          ...state.readingText,
          terms,
        },
      };
    },
    [TEXT_READ]: (state: TextState, action: Action<TextReadActionPayload>) => {
      if (action.error) {
        return state;
      }

      const { bookmark } = action.payload;
      return {
        ...state,
        readingText: {
          ...action.payload,
          // nothing loaded
          termIndexEnd: (bookmark ?? 0) - 1,
          termIndexBegin: bookmark ?? 0,
          terms: [],
        },
      };
    },
    [TERM_CREATED]: (state: TextState, action: Action<any>) => {
      if (state.readingText === null) throw new Error();
      const createdTerm = action.payload;
      if (!createdTerm) {
        return state;
      }
      const { readingText } = state;
      const newTerms = [...readingText.terms];
      for (let i = 0; i <= readingText?.terms.length; i += 1) {
        const newTerm = newTerms[i];
        if (newTerm) {
          if (
            newTerm.content.toUpperCase() === createdTerm.content.toUpperCase()
          ) {
            newTerms[i] = {
              ...createdTerm,
              content: newTerm.content,
              index: i,
            };
          }
        }
      }
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TERM_EDITED]: (state: TextState, action: Action<any>) => {
      if (state.readingText === null) throw new Error();
      const editedTerm = action.payload;
      if (!editedTerm) {
        return state;
      }
      const { readingText } = state;
      const newTerms = [...readingText.terms];
      const { termIndexBegin, termIndexEnd } = readingText;
      for (let i = termIndexBegin; i <= termIndexEnd; i += 1) {
        const newTerm = newTerms[i];
        if (newTerm) {
          if (
            newTerm.content.toUpperCase() === editedTerm.content.toUpperCase()
          ) {
            newTerms[i] = {
              ...editedTerm,
              content: newTerm.content,
              index: i,
            };
          }
        }
      }
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TEXT_DELETED]: (state: TextState, action: Action<TextState>) => {
      if (action.payload) {
        return {
          ...state,
          texts: state.texts.filter((t) => t.id !== action.payload),
        };
      }
      return state;
    },
    [TEXT_EDIT_DETAIL_FETCHED]: (
      state: TextState,
      action: Action<TextState>
    ) => {
      if (action.payload) {
        return {
          ...state,
          editDetail: action.payload,
        };
      }
      return state;
    },
    [TEXT_TERM_SELECT]: (state: TextState, action: Action<TextState>) => ({
      ...state,
      readingText: { ...state.readingText, bookmark: action.payload },
    }),

    [TERM_GET_MEANING]: (state: TextState, action: Action<any>) => {
      if (state.readingText === null) throw new Error();
      if (!action.payload) {
        return state;
      }
      const { index, termMeaning } = action.payload;

      const { terms } = state.readingText;
      const newTerms = [...terms];
      const newTerm = newTerms.find((t) => t?.indexFrom === index);
      if (!newTerm) throw new Error();
      newTerm.meaning = termMeaning.meaning;
      return {
        ...state,
        readingText: { ...state.readingText, terms: newTerms },
      };
    },
    [TERM_COUNT_LOADED]: (state: TextState, action: Action<any>) => {
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
    [READING_TEXT_TERMS_COUNT_LOADED]: (
      state: TextState,
      action: Action<any>
    ) => {
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
    [TEXT_TERM_LOADED]: (state: TextState, action: Action<any>) => {
      if (state.readingText === null) throw new Error();
      const { terms, end } = action.payload;
      let newTerms;
      if (end < state.readingText.termIndexEnd) {
        newTerms = [...terms, ...state.readingText.terms];
      } else {
        newTerms = [...state.readingText.terms, ...terms];
      }

      return {
        ...state,
        readingText: {
          ...state.readingText,
          terms: newTerms,
        },
      };
    },
    [TERM_INDEX_BEGIN_SET]: (state: TextState, action: Action<TextState>) => ({
      ...state,
      readingText: { ...state.readingText, termIndexBegin: action.payload },
    }),
    [TERM_INDEX_END_SET]: (state: TextState, action: Action<TextState>) => ({
      ...state,
      readingText: { ...state.readingText, termIndexEnd: action.payload },
    }),
    [TERM_COUNT_IN_TEXT]: (state: TextState, action: Action<any>) => {
      if (action.error) return state;
      if (state.readingText === null) throw new Error();
      const { count, termId } = action.payload;
      const { readingText } = state;
      const newTerms = [...readingText.terms];
      for (let i = 0; i <= readingText.terms.length; i += 1) {
        const newTerm = newTerms[i];
        if (newTerm) {
          if (newTerm.id === termId) {
            newTerms[i] = { ...newTerm, count };
          }
        }
      }
      return { ...state, readingText: { ...readingText, terms: newTerms } };
    },
    [TERM_DICTIONARY]: (state: TextState, action: Action<any>) => {
      if (state.readingText === null) throw new Error();
      if (!action.payload) {
        return state;
      }
      const { index, meaning } = action.payload;

      const { terms } = state.readingText;
      const term = terms.find((t) => t?.indexFrom === index);
      if (!term) throw new Error();
      term.meaning = meaning;
      return { ...state, readingText: { ...state.readingText, terms } };
    },
    [TEXT_TERM_COUNT_GET]: (state: TextState, action: Action<any>) => {
      const { termCount, textId } = action.payload;
      const newTexts = state.texts.map((t) =>
        t.id === textId ? { ...t, termCount } : t
      );
      return { ...state, texts: newTexts };
    },
    [TEXT_PROCESSED_INDEX_GET]: (state: TextState, action: Action<any>) => {
      const { processedIndex, textId } = action.payload;
      const newTexts = state.texts.map((t) =>
        t.id === textId ? { ...t, processedIndex } : t
      );
      return { ...state, texts: newTexts };
    },
  } as ReducerMap<TextState, any>,
  defaultState
);

export default textReducer;

export const selectEditDetail = (state: RootState) => state.text.editDetail;
