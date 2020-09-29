import { createAction } from "redux-actions";
import { notification } from "antd";
import {
  createTermAsync,
  editTermAsync,
  getTermMeaningAsync,
  getTextMeaningAsync,
  TermEditModel,
} from "../Apis/TermApi";

export const TERM_GET = "TERM_GET";
export const TERM_SET = "TERM_SET";
export const TERM_CREATED = "TERM_CREATED";
export const TERM_EDITED = "TERM_EDITED";
export const TERM_EDITING_GET_MEANING = "TERM_EDITING_GET_MEANING";
export const TERM_EDITING_MEANING_RESET = "TERM_EDITING_MEANING_RESET";
export const TERM_GET_MEANING = "TERM_GET_MEANING";
export const TERM_DICTIONARY = "TERM_DICTIONARY";

export const setEditingTermAction = createAction(TERM_SET, (term: any) => term);
export const dictionaryTermMeaningAction = createAction(
  TERM_DICTIONARY,
  async (content: string, from: string, to: string, id: number) => {
    const rs = await getTextMeaningAsync(content.toLowerCase(), from, to);
    if (!rs) {
      return { meaning: "", id };
    }
    return { meaning: rs.meaning, id };
  }
);

export const resetEditingTermMeaningAction = createAction(
  TERM_EDITING_MEANING_RESET
);

export const createTermAction = createAction(
  TERM_CREATED,
  async (term: any) => {
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
  }
);

export interface TermEditActionPayload {}

const editTermActionPayloadCreator = async (
  term: TermEditModel
): Promise<TermEditActionPayload | null> => {
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
};

export const editTermActionCreator = (term: TermEditModel) => async (
  dispatch: Function
) => {
  const data = await editTermActionPayloadCreator(term);
  dispatch({
    type: TERM_EDITED,
    payload: data,
  });
};

export const getTermMeaningAction = createAction(
  TERM_GET_MEANING,
  async (id: number) => {
    try {
      console.log(id)
      return await getTermMeaningAsync(id);
    } catch (e) {
      notification.error({
        message: "Can't get term mearning",
        description: e.message,
      });
      return null;
    }
  }
);
