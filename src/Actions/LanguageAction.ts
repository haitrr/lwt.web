/**
 * language actions
 */
import { createAction } from "redux-actions";
import * as languageApi from "../Apis/LanguageApi";

export const LANGUAGE_GET: string = "LANGUAGE_GET";
export const LANGUAGE_SELECT: string = "LANGUAGE_SELECT";

export const getLanguageAction: any = createAction(LANGUAGE_GET, async () => {
  return languageApi.getUserLanguageAsync();
});

export const selectLanguageAction: any = createAction(
  LANGUAGE_SELECT,
  (language: string) => language
);
