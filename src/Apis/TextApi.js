import { TEXT_API } from "../Constants";
import {
  deleteAsync,
  getAsync,
  postAsync,
  putAsync,
  patchAsync
} from "../Utilities/HttpRequest";

/**
 * Get the list of text
 */
export async function getTextsAsync(filters, page, itemPerPage) {
  try {
    return await getAsync(TEXT_API, {
      ...filters,
      page,
      itemPerPage
    });
  } catch (e) {
    return null;
  }
}

/**
 * create a text
 * @param text the text to create
 */
export async function createTextAsync(text) {
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
export async function getTextReadAsync(textId) {
  try {
    return await getAsync(`${TEXT_API}/${textId}`, null);
  } catch (e) {
    return false;
  }
}

export async function getTermCountAsync(textId) {
  return await getAsync(`${TEXT_API}/${textId}/term-counts`, null);
}

export async function deleteTextAsync(textId) {
  return deleteAsync(`${TEXT_API}/${textId}`);
}

export async function editTextAsync(id, text) {
  return putAsync(TEXT_API, id, text);
}

export async function getTextEditDetailAsync(textId) {
  return getAsync(`${TEXT_API}/${textId}/edit-details`);
}

export async function setTextBookmarkAsync(id, index) {
  return patchAsync(`${TEXT_API}`, id, "bookmark", { termIndex: index });
}
