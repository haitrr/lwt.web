import { createAction } from "redux-actions";
import {
  createTextAsync,
  getTextReadAsync,
  getTextsAsync
} from "../Apis/TextApi";

export const TEXT_FETCHED = "TEXT_FETCHED";
export const TEXT_CREATED = "TEXT_CREATED";
export const TEXT_READ = "TEXT_READ";

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
