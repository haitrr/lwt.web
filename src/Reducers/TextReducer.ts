import { handleActions } from "redux-actions";
import { TEXT_FETCHED } from "../Actions/TextAction";
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
}

const defaultState: ITextState = {
  texts: [],
  page: 1,
  itemPerPage: 10,
  total: 0,
  filters: { languageId: "" }
};

export const textReducer: any = handleActions(
  {
    [TEXT_FETCHED]: (state: any, action: any): any => {
      const { payload } = action;
      if (payload === null) {
        return { ...state, texts: [] };
      } else {
        return { texts: payload.items, total: payload.total };
      }
    }
  },
  defaultState
);
