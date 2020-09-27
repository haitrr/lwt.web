import React from "react";
import styles from "./Term.module.scss";

interface SkippedTermProps {
  content: string;
  last: any;
}

const SkippedTerm: React.FC<SkippedTermProps> = ({ content, last }) => (
  <span
    className={styles.term}
    ref={(r) => {
      if (last) {
        // eslint-disable-next-line no-param-reassign
        last.current = r;
      }
    }}
  >
    {content}
  </span>
);

export default SkippedTerm;
