import {RootState} from "../RootReducer";

export const selectEditingTermValue = (state: RootState) => {
  if (!state.text.readingText) {
    throw new Error("not reading text")
  }
  return state.text.readingText.terms[state.term.editingTerm!];
};
