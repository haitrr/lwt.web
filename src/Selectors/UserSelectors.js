export const selectDictionaryLanguage = (state, language) => {
  const { code } = state.language.languages.find(l => l.id === language);
  return state.user.setting.languageSettings[code].dictionaryLanguage;
};
