import { handleActions, Reducer } from "redux-actions";

/**
 * text reducer
 */

interface ITextState {
  texts: object[];
  page: number;
  itemPerPage: number;
}

const defaultState: ITextState = {
  texts: [],
  page: 1,
  itemPerPage: 10
};

export const textReducer: Reducer<ITextState, ITextState> = handleActions(
  {},
  defaultState
);
