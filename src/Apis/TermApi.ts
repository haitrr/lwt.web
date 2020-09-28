import { notification } from "antd";
import { getAsync, postAsync, putAsync } from "../Utilities/HttpRequest";
import { API_ROOT, DICTIONARY_API_ROOT } from "../Constants";

export async function getTermAsync(id: number) {
  return getAsync(`${API_ROOT}/term/${id}`);
}

export async function getTextMeaningAsync(text: any, from: string, to: string) {
  return getAsync(
    `${DICTIONARY_API_ROOT}/dictionary/${text}`,
    {
      fromLang: from,
      toLang: to,
    },
    (res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 404) {
        notification.info({
          message: "Meaning not found in dictionary",
          placement: "topRight",
        });
        return null;
      }
      throw res;
    }
  );
}

export async function createTermAsync(term: any) {
  return postAsync(`${API_ROOT}/term`, term);
}

export interface TermEditModel {
  id: number;
  meaning: string;
  learningLevel: string;
}

export async function editTermAsync(term: TermEditModel) {
  return putAsync(`${API_ROOT}/term`, term.id, term);
}

export async function getTermMeaningAsync(id: number) {
  return getAsync(`${API_ROOT}/term/${id}/meaning`);
}
