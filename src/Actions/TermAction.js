import { createAction } from "redux-actions";
import { toast } from "react-toastify";
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
    toast.error(`Can't get term, ${e.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    toast.success("Term is saved")
    return newTerm;
  } catch (e) {
    toast.error(`Can't create term ${e.message}`)
    return null;
  }
});
export const editTermAction = createAction(TERM_EDITED, async (term) => {
  try {
    await editTermAsync(term);
    toast.success("Term is saved");
    return term;
  } catch (e) {
    toast.error(
      `Can't edit term ${e.message}`
    );
    return null;
  }
});
export const getTermMeaningAction = createAction(
  TERM_GET_MEANING,
  async (term, index) => {
    try {
      const termMeaning = await getTermMeaningAsync(term.id);
      return { termMeaning, index };
    } catch (e) {
      toast.error(
        `Can't get term mearning ${e.message}`
      );
      return null;
    }
  }
);
