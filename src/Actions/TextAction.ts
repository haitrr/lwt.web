import { createAction } from "redux-actions";
import { notification } from "antd";
import {
  createTextAsync,
  deleteTextAsync,
  editTextAsync,
  getTermCountByLearningLevelAsync,
  getTextEditDetailAsync,
  getTextReadAsync,
  getTextsAsync,
  getTextTermsAsync,
  setTextBookmarkAsync,
  getTermCountInTextAsync,
  getTermCountAsync,
  getProcessedIndexAsync,
} from "../Apis/TextApi";

export const TEXT_FETCHED = "TEXT_FETCHED";
export const TEXT_CREATED = "TEXT_CREATED";
export const TEXT_DELETED = "TEXT_DELETED";
export const TEXT_READ = "TEXT_READ";
export const TEXT_EDITED = "TEXT_EDITED";
export const TEXT_EDIT_DETAIL_FETCHED = "TEXT_EDIT_DETAIL_FETCHED";
export const TEXT_BOOKMARK_SET = "TEXT_BOOKMARK_SET";
export const TEXT_TERM_SELECT = "TEXT_TERM_SELECT";
export const TERM_COUNT_LOADED = "TERM_COUNT_LOADED";
export const READING_TEXT_TERMS_COUNT_LOADED =
  "READING_TEXT_TERMS_COUNT_LOADED";
export const TEXT_TERM_LOADED = "TEXT_TERM_LOADED";
export const TERM_INDEX_BEGIN_SET = "TERM_INDEX_BEGIN_SET";
export const TERM_INDEX_END_SET = "TERM_INDEX_END_SET";
export const TERM_COUNT_IN_TEXT = "TERM_COUNT_IN_TEXT";
export const TEXT_TERM_COUNT_GET = "TEXT_TERM_COUNT_GET";
export const TEXT_PROCESSED_INDEX_GET = "TEXT_PROCESSED_INDEX_GET";

/**
 * get texts action
 */
export const getTextsAction = createAction(
  TEXT_FETCHED,
  async (filters: any, page: number, itemPerPage: number) => {
    const result = await getTextsAsync(filters, page, itemPerPage);

    return {
      texts: result.items,
      total: result.total,
      page,
      itemPerPage,
      filters,
    };
  }
);

/**
 * set reading text.
 */

export const readTextAction = createAction(TEXT_READ, (textId: number) =>
  getTextReadAsync(textId)
);

export const loadTermCountAction = createAction(
  TERM_COUNT_LOADED,
  async (textId: number) => getTermCountByLearningLevelAsync(textId)
);

export const loadReadingTexttermsCountByLearningLevelAction = createAction(
  READING_TEXT_TERMS_COUNT_LOADED,
  async (textId: number) => getTermCountByLearningLevelAsync(textId)
);

/**
 * create text action
 */
export const createTextAction = createAction(TEXT_CREATED, async (text: any) =>
  createTextAsync(text)
);

export const deleteTextAction = createAction(
  TEXT_DELETED,
  async (textId: number) => {
    try {
      await deleteTextAsync(textId);
      notification.success({ message: "Text deleted." });
      return textId;
    } catch {
      notification.error({
        message: "Can't not delete text, please try again.",
      });
      return null;
    }
  }
);

export const editTextAction = createAction(
  TEXT_EDITED,
  async (id: number, text: any) => {
    try {
      await editTextAsync(id, text);
      notification.success({ message: "Text saved successfully." });
      return text;
    } catch {
      notification.error({
        message: "Can't not save text , please try again.",
      });
      return null;
    }
  }
);

export const getTextEditDetailAction = createAction(
  TEXT_EDIT_DETAIL_FETCHED,
  async (textId: number) => {
    try {
      return await getTextEditDetailAsync(textId);
    } catch {
      notification.error({
        message: "Something wen't wrong, please try again.",
      });
      return null;
    }
  }
);

export const setBookmarkAction = createAction(
  TEXT_BOOKMARK_SET,
  async (id: number, index: number) => {
    await setTextBookmarkAsync(id, index);
  }
);
export const selectTermAction = createAction(
  TEXT_TERM_SELECT,
  async (index: number) => index
);

export const getTextTermsAction = createAction(
  TEXT_TERM_LOADED,
  async (textId: number, indexFrom: number, indexTo: number) => {
    const result = await getTextTermsAsync(textId, indexFrom, indexTo);
    return { ...result, begin: indexFrom, end: indexTo };
  }
);

export const setTermIndexBeginAction = createAction(
  TERM_INDEX_BEGIN_SET,
  (begin: number) => begin
);
export const setTermIndexEndAction = createAction(
  TERM_INDEX_END_SET,
  (end: number) => end
);
export const getTermCountInTextAction = createAction(
  TERM_COUNT_IN_TEXT,
  (termId: number, textId: number) => getTermCountInTextAsync(termId, textId)
);

export const getTermCountAction = createAction(
  TEXT_TERM_COUNT_GET,
  async (textId: number) => {
    const { termCount } = await getTermCountAsync(textId);
    return { termCount, textId };
  }
);
export const getProcessedIndexAction = createAction(
  TEXT_PROCESSED_INDEX_GET,
  async (textId: number) => {
    const { processedIndex } = await getProcessedIndexAsync(textId);
    return { processedIndex, textId };
  }
);
