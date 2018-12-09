import { createAction } from "redux-actions";
import { notification } from "antd";
import { getTermAsync } from "../Apis/TermApi";

export const TERM_GET = "TERM_GET";
export const TERM_SET = "TERM_SET";

export const getTermAction = createAction(TERM_GET, async id => {
  try {
    return await getTermAsync(id);
  } catch (e) {
    notification.error({ message: "Can't get term", description: e.message });
  }
});

export const setEditingTermAction = createAction(TERM_SET, term => term);
