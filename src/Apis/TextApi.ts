import { TEXT_API } from "src/Constants";
import { getAsync } from "src/Utilities/HttpRequest";

interface ITextListItem {
  title: string;
}
interface ITextList {
  total: number;
  items: ITextListItem[];
}

/**
 * Get the list of text
 */
export async function getListAsync(): Promise<ITextList | null> {
  try {
    return await getAsync<ITextList>(TEXT_API, {});
  } catch {
    return null;
  }
}
