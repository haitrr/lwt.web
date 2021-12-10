import { TEXT_API } from "../Constants";
import {
  deleteAsync,
  getAsync,
  postAsync,
  putAsync,
  patchAsync,
} from "../Utilities/HttpRequest";
import {TextFilter} from "../Actions/TextAction";
import {TextItem} from "../Reducers/TextReducer";

/**
 * Get the list of text
 */
export async function getTextsAsync(filters: TextFilter, page: number, itemPerPage: number) {
  try {
    return await getAsync(TEXT_API, {
      ...filters,
      page,
      itemPerPage,
    });
  } catch (e) {
    return null;
  }
}

/**
 * create a text
 * @param text the text to create
 */
export async function createTextAsync(text: Text) {
  try {
    await postAsync(TEXT_API, text);

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * create a text
 * @param textId the text id to get
 */
export async function getTextReadAsync(textId: number) {
  try {
    return await getAsync(`${TEXT_API}/${textId}`);
  } catch (e) {
    return false;
  }
}

export async function getTermCountByLearningLevelAsync(textId: number) {
  return getAsync(`${TEXT_API}/${textId}/term-counts`);
}

export async function deleteTextAsync(textId: number) {
  return deleteAsync(`${TEXT_API}/${textId}`);
}

export async function editTextAsync(id: number, text: Text) {
  return putAsync(TEXT_API, id, text);
}

export async function getTextEditDetailAsync(textId: number) {
  return getAsync(`${TEXT_API}/${textId}/edit-details`);
}

export async function setTextBookmarkAsync(id: number, index: number) {
  return patchAsync(`${TEXT_API}`, id, "bookmark", { termIndex: index });
}
export async function getTextTermsAsync(textId: number, indexFrom: number, indexTo: number) {
  return getAsync(`${TEXT_API}/${textId}/terms`, { indexFrom, indexTo });
}

export async function getTermCountInTextAsync(termId: number, textId: number) {
  return getAsync(`${TEXT_API}/${textId}/terms/${termId}/count`);
}

export async function getTermCountAsync(textId: number) {
  return getAsync(`${TEXT_API}/${textId}/term-count`);
}

export async function getProcessedTermCountAsync(textId: number) {
  return getAsync(`${TEXT_API}/${textId}/processed-term-count`);
}

export async function getTextCountByLanguages(): Promise<{[key: string]: number}> {
  return getAsync(`${TEXT_API}/count`);
}

export function getLastReadTextAsync(): Promise<TextItem | null> {
  return getAsync(`${TEXT_API}/last-read`)
}
