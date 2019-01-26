import {
  getAsync,
  getJsonpAsync,
  postAsync,
  putAsync
} from "../Utilities/HttpRequest";
import { API_ROOT } from "../Constants";

export async function getTermAsync(id) {
  return getAsync(`${API_ROOT}/term/${id}`);
}

export async function createTermAsync(term) {
  return postAsync(`${API_ROOT}/term`, term);
}

export async function editTermAsync(term) {
  return putAsync(`${API_ROOT}/term`, term.id, term);
}

export async function getMeaningAsync(term, from, dest) {
  return getJsonpAsync(
    `https://glosbe.com/gapi/translate?from=${from}&dest=${dest}&format=json&phrase=${term}`
  );
}
