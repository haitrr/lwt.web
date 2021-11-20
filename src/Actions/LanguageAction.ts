/**
 * language actions
 */
import {createAction} from "redux-actions";
import * as languageApi from "../Apis/LanguageApi";

export const LANGUAGE_GET = "LANGUAGE_GET";
export const LANGUAGE_SELECT = "LANGUAGE_SELECT";

export const getLanguageAction = createAction(LANGUAGE_GET, async () =>
  languageApi.getUserLanguageAsync()
);

export const selectLanguageAction = createAction<string, string>(
  LANGUAGE_SELECT,
  language => language
);
