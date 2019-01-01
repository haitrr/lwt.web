import { createAction } from "redux-actions";
import { notification } from "antd";
import { createTermAsync, editTermAsync, getTermAsync } from "../Apis/TermApi";

export const TERM_GET = "TERM_GET";
export const TERM_SET = "TERM_SET";
export const TERM_CREATED = "TERM_CREATED";
export const TERM_EDITED = "TERM_EDITED";

export const getTermAction = createAction(TERM_GET, async id => {
  try {
    return await getTermAsync(id);
  } catch (e) {
    notification.error({ message: "Can't get term", description: e.message });
  }
});

export const setEditingTermAction = createAction(TERM_SET, term => term);
export const createTermAction = createAction(TERM_CREATED, async term => {
  try {
    term.id = await createTermAsync(term);
    notification.success({
      message: "Term is saved"
    });
    return term;
  } catch (e) {
    notification.error({
      message: "Can't create term",
      description: e.message
    });
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
  }
});
