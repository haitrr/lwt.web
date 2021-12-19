/**
 * Language reducers
 */
import {handleActions} from "redux-actions";
import {LANGUAGE_SELECT} from "../Actions/LanguageAction";
import {LanguageState} from "../RootReducer";


const defaultState: LanguageState = {
};

export const languageReducer = handleActions<LanguageState, any>(
  {
    [LANGUAGE_SELECT]: (state, action) => ({
      ...state,
      currentLanguage: action.payload
    })
  },
  defaultState
);
