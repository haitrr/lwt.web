/**
 * language actions
 */
import {createAction} from "redux-actions";

export const LANGUAGE_SELECT = "LANGUAGE_SELECT";

export const selectLanguageAction = createAction<string, string>(
  LANGUAGE_SELECT,
  language => language
);
