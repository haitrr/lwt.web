import { createAction } from "redux-actions";
import {
  createTextAsync,
  getTextReadAsync,
  getTextsAsync
} from "src/Apis/TextApi";
import { ITextFilters } from "../Interfaces/ITextFilters";

export const TEXT_FETCHED: string = "TEXT_FETCHED";
export const TEXT_CREATED: string = "TEXT_CREATED";
export const TEXT_READ: string = "TEXT_READ";

/**
 * get texts action
 */
export const getTextsAction: any = createAction(
  TEXT_FETCHED,
  async (filters: ITextFilters, page: number, itemPerPage: number) => {
    const result: any = await getTextsAsync(filters, page, itemPerPage);

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

export const readTextAction: any = createAction(
  TEXT_READ,
  async (textId: string) => getTextReadAsync(textId)
);

/**
 * create text action
 */
export const createTextAction: any = createAction(
  TEXT_CREATED,
  async (text: any) => createTextAsync(text)
);
