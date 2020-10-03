import { RootState } from "../RootReducer";

export const selectDictionaryLanguage = (state: RootState) => {
  const language = state.user!.setting!.languageSettings.find(
    (l) => l.languageCode === state.text.readingText!.languageCode
  )!;
  return language.dictionaryLanguageCode;
};
