import { handleActions } from "redux-actions";
import { TEXT_FETCHED, TEXT_READ } from "../Actions/TextAction";

/**
 * text reducer
 */


const defaultState= {
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
    }
  },
  defaultState
);
