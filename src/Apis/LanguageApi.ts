import {FUNCTION_ROOT} from "../Constants";
import { getAsync } from "../Utilities/HttpRequest";

/**
 * get current user's languages
 */
export async function getUserLanguageAsync() {
  try {
    return await getAsync(`${FUNCTION_ROOT}/get_languages`, {});
  } catch (e) {
    return null;
  }
}
