/**
 * Language reducers
 */
import { Action, handleActions, ReducerMap } from "redux-actions";
import { LANGUAGE_GET, LANGUAGE_SELECT } from "../Actions/LanguageAction";

export interface Language {
  id: number;
  code: string;
  name: string;
}

export interface LanguageState {
  currentLanguage: string;
  languages: Language[];
}
const defaultState: LanguageState = {
  languages: [],
  currentLanguage: "en",
};

export default handleActions(
  {
    [LANGUAGE_GET]: (state: LanguageState, action: Action<Language[]>) => ({
      ...state,
      languages: action.payload,
      currentLanguage:
        state.currentLanguage === ""
          ? action.payload.length > 0
            ? action.payload[0].id
            : null
          : state.currentLanguage,
    }),
    [LANGUAGE_SELECT]: (state: LanguageState, action: Action<boolean>) => ({
      ...state,
      currentLanguage: action.payload,
    }),
  } as ReducerMap<LanguageState, any>,
  defaultState
);
