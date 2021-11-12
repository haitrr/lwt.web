import React from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./TermEditForm.module.scss";
import { importantColors } from "../../../Enums";
import {Term} from "../../../Reducers/TextReducer";

interface Props {
  term: Term;
}

const TermContent: React.FC<Props> = ({ term }) => (
  <CopyToClipboard
    text={term.content}
    onCopy={() => {
      toast.info('Copied to clipboard.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    }
  >
    <div
      className={styles.title}
      style={{ color: importantColors[Math.min(term.count, 49)] }}
    >
      {`${term.content}(${term.count ?? "-"})`}
    </div>
  </CopyToClipboard>
);

export default TermContent;
