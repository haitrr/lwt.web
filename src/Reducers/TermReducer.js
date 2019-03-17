import { handleActions } from "redux-actions";
import { TERM_CREATED, TERM_SET } from "../Actions/TermAction";

const defaultState = {
  editingTerm: null
};
export default handleActions(
  {
    [TERM_SET]: (state, action) => {
      if (action.payload) {
        return { ...state, editingTerm: action.payload };
      }
      return { ...state, editingTerm: null };
    },
    [TERM_CREATED]: state => ({
      ...state,
      editingTerm: null
    })
  },
  defaultState
);
