import { createAction } from "redux-actions";
import { notification } from "antd";
import {
  createTermAsync,
  editTermAsync,
  getMeaningAsync,
  getTermAsync
} from "../Apis/TermApi";

export const TERM_GET = "TERM_GET";
export const TERM_SET = "TERM_SET";
export const TERM_CREATED = "TERM_CREATED";
export const TERM_EDITED = "TERM_EDITED";
export const TERM_GET_MEANING = "TERM_GET_MEANING";

export const getTermAction = createAction(TERM_GET, async id => {
  try {
    return await getTermAsync(id);
  } catch (e) {
    notification.error({ message: "Can't get term", description: e.message });
    return null;
  }
});

export const setEditingTermAction = createAction(TERM_SET, term => term);
export const getEditingTermMeaningAction = createAction(
  TERM_GET_MEANING,
  async (content, from) => {
    const rs = await getMeaningAsync(content.toLowerCase(), from, "vi");
    if (!rs) {
      return "";
    }
    return rs.result === "ok"
      ? rs.tuc
          .filter(o => o.phrase)
          .map(o => o.phrase.text)
          .join(", ")
      : "";
  }
);
export const createTermAction = createAction(TERM_CREATED, async term => {
  try {
    const newTerm = { ...term };
    newTerm.id = await createTermAsync(term);
    notification.success({
      message: "Term is saved"
    });
    return newTerm;
  } catch (e) {
    notification.error({
      message: "Can't create term",
      description: e.message
    });
    return null;
  }
});
export const editTermAction = createAction(TERM_EDITED, async term => {
  try {
    await editTermAsync(term);
    notification.success({
      message: "Term is saved"
    });
    return term;
  } catch (e) {
    notification.error({
      message: "Can't edit term",
      description: e.message
    });
    return null;
  }
});
