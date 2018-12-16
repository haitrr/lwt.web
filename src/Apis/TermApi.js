import { getAsync, postAsync } from "../Utilities/HttpRequest";
import { API_ROOT } from "../Constants";

export async function getTermAsync(id) {
  return await getAsync(`${API_ROOT}/term/${id}`);
}

export async function createTermAsync(term) {
  return await postAsync(`${API_ROOT}/term`, term);
}
