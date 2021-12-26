import { RootState } from '../RootReducer';

export const selectBookmark = (state: RootState) => state.text.readingText?.bookmark;
export const selectTotalTerm = (state: RootState) => state.text.readingText?.termCount;
export const selectEditDetail = (state: RootState) => state.text.editDetail;
