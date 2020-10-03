import { RootState } from "../RootReducer";

export const selectEditingTermValue = (state: RootState) =>
  state.text.readingText!.terms.find(
    (t) => t?.indexFrom === state.term.editingTerm
  );

export const selectEditingTermMeaning = (state: RootState) =>
  state.term.editingTermMeaning;
