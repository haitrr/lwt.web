import { handleActions } from "redux-actions";
import {
  TERM_CREATED,
  TERM_EDITING_GET_MEANING,
  TERM_EDITING_MEANING_RESET,
  TERM_SET,
} from "../Actions/TermAction";
import { TEXT_TERM_SELECT } from "../Actions/TextAction";

const defaultState = {
  editingTerm: null,
};
export default handleActions(
  {
    [TERM_SET]: (state, action) => {
      if (action.payload) {
        return { ...state, editingTerm: action.payload };
      }
      return { ...state, editingTerm: null };
    },
    [TEXT_TERM_SELECT]: (state, action) => {
      if (action.payload) {
        return { ...state, selectingTerm: action.payload };
      }
      return { ...state, editingTerm: null };
    },
    [TERM_CREATED]: (state) => ({
      ...state,
      editingTerm: null,
    }),
    [TERM_EDITING_GET_MEANING]: (state, action) => ({
      ...state,
      editingTermMeaning: action.payload,
    }),
    [TERM_EDITING_MEANING_RESET]: (state) => ({
      ...state,
      editingTermMeaning: "",
    }),
  },
  defaultState
);
