/**
 * Language reducers
 */
import { handleActions } from "redux-actions";
import { LANGUAGE_GET, LANGUAGE_SELECT } from "../Actions/LanguageAction";

const defaultState: object = {
  languages: [],
  currentLanguage: ""
};

export const languageReducer: any = handleActions(
  {
    [LANGUAGE_GET]: (state: any, action: any): any => {
      return {
        ...state,
        languages: action.payload,
        currentLanguage:
          state.currentLanguage === ""
            ? action.payload.length > 0
              ? action.payload[0].id
              : null
            : state.currentLanguage
      };
    },
    [LANGUAGE_SELECT]: (state: any, action: any): any => {
      return {
        ...state,
        currentLanguage: action.payload
      };
    }
  },
  defaultState
);
