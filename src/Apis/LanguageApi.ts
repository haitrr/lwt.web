import { API_ROOT } from '../Constants';
import { getAsync } from '../Utilities/HttpRequest';

/**
 * get current user's languages
 */
export async function getUserLanguageAsync() {
  try {
    return await getAsync(`${API_ROOT}/language`, {});
  } catch (e) {
    return null;
  }
}
