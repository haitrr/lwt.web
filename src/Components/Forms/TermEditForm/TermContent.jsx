import React from "react";
import { notification } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
import styles from "./TermEditForm.module.scss";
import { importantColors } from "../../../Enums";

const TermContent = ({ term }) => (
  <CopyToClipboard
    text={term.content}
    onCopy={() =>
      notification.info({
        message: "Copied to clipboard.",
        placement: "topRight"
      })
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
