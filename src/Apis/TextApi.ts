import { TEXT_API } from "src/Constants";
import { getAsync, postAsync } from "src/Utilities/HttpRequest";
import { ITextFilters } from "../Interfaces/ITextFilters";

interface ITextListItem {
  title: string;
  languageId: string;
}

interface ITextList {
  total: number;
  items: ITextListItem[];
}

/**
 * Get the list of text
 */
export async function getTextsAsync(
  filters: ITextFilters,
  page: number,
  itemPerPage: number
): Promise<ITextList | null> {
  try {
    return await getAsync<ITextList>(TEXT_API, {
      ...filters,
      page,
      itemPerPage
    });
  } catch (e) {
    return null;
  }
}

/**
 * create a text
 * @param text the text to create
 */
export async function createTextAsync(text: any): Promise<boolean> {
  try {
    await postAsync(TEXT_API, text);

    return true;
  } catch (e) {
    return false;
  }
}
