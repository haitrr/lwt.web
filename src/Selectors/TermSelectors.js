export const selectEditingTermValue = (state) =>
  state.text.readingText.terms.find(
    (t) => t?.indexFrom === state.term.editingTerm
  );

export const selectEditingTermMeaning = (state) =>
  state.term.editingTermMeaning;
