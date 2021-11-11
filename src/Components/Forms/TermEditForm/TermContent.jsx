import React from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
import styles from "./TermEditForm.module.scss";
import { importantColors } from "../../../Enums";

const TermContent = ({ term }) => (
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

TermContent.propTypes = {
  term: PropTypes.shape({}).isRequired
};

export default TermContent;
