import { createAction } from "redux-actions";
import { notification } from "antd";
import {
  createTermAsync,
  editTermAsync,
  getTermAsync,
  getTermMeaningAsync,
  getTextMeaningAsync,
} from "../Apis/TermApi";

export const TERM_GET = "TERM_GET";
export const TERM_SET = "TERM_SET";
export const TERM_CREATED = "TERM_CREATED";
export const TERM_EDITED = "TERM_EDITED";
export const TERM_EDITING_GET_MEANING = "TERM_EDITING_GET_MEANING";
export const TERM_EDITING_MEANING_RESET = "TERM_EDITING_MEANING_RESET";
export const TERM_GET_MEANING = "TERM_GET_MEANING";
export const TERM_DICTIONARY = "TERM_DICTIONARY";

export const getTermAction = createAction(TERM_GET, async (id, index) => {
  try {
    return { term: await getTermAsync(id), index };
  } catch (e) {
    notification.error({ message: "Can't get term", description: e.message });
    return null;
  }
});

export const setEditingTermAction = createAction(TERM_SET, (term) => term);
export const getEditingTermMeaningAction = createAction(
  TERM_EDITING_GET_MEANING,
  async (content, from, to) => {
    const rs = await getTextMeaningAsync(content.toLowerCase(), from, to);
    if (!rs) {
      return "";
    }
    return rs.meaning;
  }
);

export const dictionaryTermMeaningAction = createAction(
  TERM_DICTIONARY,
  async (content, from, to, index) => {
    const rs = await getTextMeaningAsync(content.toLowerCase(), from, to);
    if (!rs) {
      return { meaning: "", index };
    }
    return { meaning: rs.meaning, index };
  }
);

export const resetEditingTermMeaningAction = createAction(
  TERM_EDITING_MEANING_RESET
);

export const createTermAction = createAction(TERM_CREATED, async (term) => {
  try {
    const newTerm = { ...term };
    newTerm.id = await createTermAsync(term);
    notification.success({
      message: "Term is saved",
    });
    return newTerm;
  } catch (e) {
    notification.error({
      message: "Can't create term",
      description: e.message,
    });
    return null;
  }
});
export const editTermAction = createAction(TERM_EDITED, async (term) => {
  try {
    await editTermAsync(term);
    notification.success({
      message: "Term is saved",
    });
    return term;
  } catch (e) {
    notification.error({
      message: "Can't edit term",
      description: e.message,
    });
    return null;
  }
});
export const getTermMeaningAction = createAction(
  TERM_GET_MEANING,
  async (term, index) => {
    console.log(term, index);
    try {
      const termMeaning = await getTermMeaningAsync(term.id);
      return { termMeaning, index };
    } catch (e) {
      notification.error({
        message: "Can't get term mearning",
        description: e.message,
      });
      return null;
    }
  }
);
