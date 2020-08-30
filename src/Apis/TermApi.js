import { notification } from "antd";
import { getAsync, postAsync, putAsync } from "../Utilities/HttpRequest";
import { API_ROOT, DICTIONARY_API_ROOT } from "../Constants";

export async function getTermAsync(id) {
  return getAsync(`${API_ROOT}/term/${id}`);
}

export async function getTextMeaningAsync(text, from, to) {
  return getAsync(
    `${DICTIONARY_API_ROOT}/dictionary/${text}`,
    {
      fromLang: from,
      toLang: to
    },
    res => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 404) {
        notification.info("Meaning not found in dictionary");
        return null;
      }
      throw res;
    }
  );
}

export async function createTermAsync(term) {
  return postAsync(`${API_ROOT}/term`, term);
}

export async function editTermAsync(term) {
  return putAsync(`${API_ROOT}/term`, term.id, term);
}

export async function getTermMeaningAsync(id) {
  return getAsync(`${API_ROOT}/term/${id}/meaning`);
}
