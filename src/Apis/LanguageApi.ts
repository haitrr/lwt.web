import { API_ROOT } from "../Constants";
import { getAsync } from "../Utilities/HttpRequest";

/**
 * get current user's languages
 */
export async function getUserLanguageAsync(): Promise<any> {
  try {
    return await getAsync<object[]>(`${API_ROOT}/language`, {});
  } catch (e) {
    return [];
  }
}
