import { handleActions } from "redux-actions";
import { TERM_CREATED, TERM_GET, TERM_SET } from "../Actions/TermAction";

const defaultState = {
  editingTerm: null
};
export const termReducer = handleActions(
  {
    [TERM_GET]: (state, action) => {
      return { ...state, editingTerm: { ...action.payload } };
    },
    [TERM_SET]: (state, action) => {
      return { ...state, editingTerm: { ...action.payload } };
    },
    [TERM_CREATED]: state => {
      return {
        ...state,
        editingTerm: null
      };
    }
  },
  defaultState
);