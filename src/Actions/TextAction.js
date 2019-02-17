import { createAction } from "redux-actions";
import { notification } from "antd";
import {
  createTextAsync,
  deleteTextAsync,
  editTextAsync,
  getTextEditDetailAsync,
  getTextReadAsync,
  getTextsAsync
} from "../Apis/TextApi";

export const TEXT_FETCHED = "TEXT_FETCHED";
export const TEXT_CREATED = "TEXT_CREATED";
export const TEXT_DELETED = "TEXT_DELETED";
export const TEXT_READ = "TEXT_READ";
export const TEXT_EDITED = "TEXT_EDITED";
export const TEXT_EDIT_DETAIL_FETCHED = "TEXT_EDIT_DETAIL_FETCHED";

/**
 * get texts action
 */
export const getTextsAction = createAction(
  TEXT_FETCHED,
  async (filters, page, itemPerPage) => {
    const result = await getTextsAsync(filters, page, itemPerPage);

    return {
      texts: result.items,
      total: result.total,
      page,
      itemPerPage,
      filters
    };
  }
);

/**
 * set reading text.
 */

export const readTextAction = createAction(TEXT_READ, async textId =>
  getTextReadAsync(textId)
);

/**
 * create text action
 */
export const createTextAction = createAction(TEXT_CREATED, async text =>
  createTextAsync(text)
);

export const deleteTextAction = createAction(TEXT_DELETED, async textId => {
  try {
    await deleteTextAsync(textId);
    notification.success({ message: "Text deleted." });
    return textId;
  } catch {
    notification.error({ message: "Can't not delete text, please try again." });
    return null;
  }
});

export const editTextAction = createAction(TEXT_EDITED, async (id, text) => {
  try {
    await editTextAsync(id, text);
    notification.success({ message: "Text saved successfully." });
    return text;
  } catch {
    notification.error({ message: "Can't not save text , please try again." });
    return null;
  }
});

export const getTextEditDetailAction = createAction(
  TEXT_EDIT_DETAIL_FETCHED,
  async textId => {
    try {
      return await getTextEditDetailAsync(textId);
    } catch {
      notification.error({
        message: "Something wen't wrong, please try again."
      });
      return null;
    }
  }
);
