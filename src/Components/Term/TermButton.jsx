import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./Term.module.scss";
import { setBookmarkAction, selectTermAction } from "../../Actions/TextAction";
import { importantColors, isLearningTerm } from "../../Enums";

class TermButton extends React.Component {
  onTermClick = (e) => {
    const { setBookmark, id, selectTerm, term, onClick } = this.props;
    selectTerm(term.indexFrom);
    setBookmark(id, term.indexFrom);
    onClick(e);
  };

  storageButtonRef = (ref) => {
    const { bookmark, bookmarkRef, last } = this.props;
    if (bookmark) bookmarkRef.current = ref;
    if (last) last.current = ref;
  };

  render() {
    const { term, bookmark, learningLevel } = this.props;

    return (
      <button
        type="button"
        className={`${styles.term} ${styles[`term-${learningLevel}`]} ${
          bookmark ? styles.bookmark : null
        }`}
        style={
          term.count && isLearningTerm(learningLevel)
            ? {
                borderBottom: `solid 2px ${
                  importantColors[Math.min(term.count, 49)]
                }`,
                marginBottom: "-2px",
              }
            : null
        }
        ref={this.storageButtonRef}
        onClick={this.onTermClick}
      >
        {
          // need react fragment here to prevent stupid ant design
          // to insert a space between two chinese characters.
        }
        {term.content}
      </button>
    );
  }
}

TermButton.defaultProps = {
  bookmarkRef: null,
  last: null,
};

TermButton.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  bookmarkRef: PropTypes.shape({}),
  last: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
  term: PropTypes.shape({}).isRequired,
  setBookmark: PropTypes.func.isRequired,
  selectTerm: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  learningLevel: PropTypes.string.isRequired,
};

export default connect((state) => ({ id: state.text.readingText.id }), {
  setBookmark: setBookmarkAction,
  selectTerm: selectTermAction,
})(TermButton);
