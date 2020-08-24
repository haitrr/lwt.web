import React from "react";
import PropTypes from "prop-types";
import styles from "./Term.module.scss";

const SkippedTerm = ({ term, last }) => (
  <span
    className={styles.term}
    ref={r => {
      if (last) {
        // eslint-disable-next-line no-param-reassign
        last.current = r;
      }
    }}
  >
    {term.content}
  </span>
);

SkippedTerm.defaultProps = {
  last: null
};

SkippedTerm.propTypes = {
  term: PropTypes.shape({
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string
  }).isRequired,
  last: PropTypes.shape({})
};

export default SkippedTerm;
