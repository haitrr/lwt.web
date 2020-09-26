/**
 * Language reducers
 */
import { handleActions } from "redux-actions";
import { LANGUAGE_GET, LANGUAGE_SELECT } from "../Actions/LanguageAction";

const defaultState = {
  languages: [],
  currentLanguage: "en",
};

export const languageReducer = handleActions(
  {
    [LANGUAGE_GET]: (state, action) => ({
      ...state,
      languages: action.payload,
      currentLanguage:
        state.currentLanguage === ""
          ? action.payload.length > 0
            ? action.payload[0].id
            : null
          : state.currentLanguage,
    }),
    [LANGUAGE_SELECT]: (state, action) => ({
      ...state,
      currentLanguage: action.payload,
    }),
  },
  defaultState
);
