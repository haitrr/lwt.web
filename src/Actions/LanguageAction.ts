/**
 * language actions
 */
import { createAction } from "redux-actions";
import * as languageApi from "../Apis/LanguageApi";

export const LANGUAGE_GET = "LANGUAGE_GET";
export const LANGUAGE_SELECT = "LANGUAGE_SELECT";

export const getLanguageActionCreator = () => async (dispatch: Function) => {
  const data = await languageApi.getUserLanguageAsync();
  dispatch({ type: LANGUAGE_GET, payload: data });
};

export const getLanguageAction = createAction(LANGUAGE_GET, async () =>
  languageApi.getUserLanguageAsync()
);

export const selectLanguageActionCreator = (language: string) => (
  dispatch: Function
) => {
  dispatch({
    type: LANGUAGE_SELECT,
    payload: language,
  });
};

export const selectLanguageAction = createAction(
  LANGUAGE_SELECT,
  (language: string) => language
);
