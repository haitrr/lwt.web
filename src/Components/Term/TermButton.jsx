import PropTypes from "prop-types";
import React from "react";
import styles from "./Term.module.scss";

const TermButton = ({ term, bookmark, bookmarkRef, last, onClick }) => {
  const storageButtonRef = ref => {
    if (bookmark) bookmarkRef.current = ref;
    if (last) last.current = ref;
  };

  return (
    <button
      type="button"
      className={`${styles.term} ${styles[`term-${term.learningLevel}`]} ${
        bookmark ? styles.bookmark : null
      }`}
      ref={storageButtonRef}
      onClick={onClick}
    >
      {
        // need react fragment here to prevent stupid ant design
        // to insert a space between two chinese characters.
      }
      {term.content}
    </button>
  );
};

TermButton.defaultProps = {
  bookmarkRef: null,
  last: null
};

TermButton.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  bookmarkRef: PropTypes.shape({}),
  last: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
  term: PropTypes.shape({}).isRequired
};

export default TermButton;
