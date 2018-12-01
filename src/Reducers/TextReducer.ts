import { handleActions } from "redux-actions";
import { TEXT_FETCHED, TEXT_READ } from "../Actions/TextAction";
import { ITextFilters } from "../Interfaces/ITextFilters";

/**
 * text reducer
 */

interface ITextState {
  texts: object[];
  page: number;
  itemPerPage: number;
  total: number;
  filters: ITextFilters;
  readingText: any;
}

const defaultState: ITextState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: { languageId: "" },
  readingText: null
};

export const textReducer: any = handleActions(
  {
    [TEXT_FETCHED]: (state: any, action: any): any => {
      const { payload } = action;
      if (payload === null) {
        return { ...state, texts: [] };
      } else {
        return { ...payload };
      }
    },
    [TEXT_READ]: (state: any, action: any): any => {
      return { ...state, readingText: action.payload };
    }
  },
  defaultState
);
