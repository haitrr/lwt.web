export const selectDictionaryLanguage = state => {
  const language = state.user?.setting?.languageSettings.find(
    l => l.languageCode === state.text.readingText.languageCode
  );
  if (!language) {
    return null;
  }
  return language.dictionaryLanguageCode;
};
