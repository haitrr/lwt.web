export const selectEditingTermValue = state =>
  state.text.readingText.terms[state.term.editingTerm];

export const selectEditingTermMeaning = state => state.term.editingTermMeaning;
