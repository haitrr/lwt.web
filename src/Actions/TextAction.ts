import { createAction } from "redux-actions";
import { createTextAsync, getTextsAsync } from "src/Apis/TextApi";
import { ITextFilters } from "../Interfaces/ITextFilters";

export const TEXT_FETCHED: string = "TEXT_FETCHED";
export const TEXT_CREATED: string = "TEXT_CREATED";

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
 * create text action
 */
export const createTextAction: any = createAction(
  TEXT_CREATED,
  async (text: any) => createTextAsync(text)
);
