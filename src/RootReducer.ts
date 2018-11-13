import { combineReducers, Reducer } from "redux";
import { languageReducer } from "./Reducers/LanguageReducer";
import { textReducer } from "./Reducers/TextReducer";
import { userReducer } from "./Reducers/UserReducer";

/**
 * root reducer
 */
export const rootReducer: Reducer = combineReducers({
  user: userReducer,
  language: languageReducer,
  text: textReducer
});
