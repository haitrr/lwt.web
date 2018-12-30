import { getAsync, postAsync, putAsync } from "../Utilities/HttpRequest";
import { API_ROOT } from "../Constants";

export async function getTermAsync(id) {
  return await getAsync(`${API_ROOT}/term/${id}`);
}

export async function createTermAsync(term) {
  return await postAsync(`${API_ROOT}/term`, term);
}

export async function editTermAsync(term) {
  return await putAsync(`${API_ROOT}/term`, term.id, term);
}
