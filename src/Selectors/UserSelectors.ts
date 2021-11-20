import {RootState} from "../RootReducer";

export const selectDictionaryLanguage = (state: RootState) => {
  if (!state.text.readingText) {
    throw new Error("not reading text")
  }

  const language = state.user?.setting?.languageSettings.find(
    l => l.languageCode === state.text.readingText!.languageCode
  );
  if (!language) {
    throw new Error("not reading text")
  }
  return language.dictionaryLanguageCode;
};
