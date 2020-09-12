import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./Term.module.scss";
import { setBookmarkAction, selectTermAction } from "../../Actions/TextAction";
import { importantColors } from "../../Enums";

class TermButton extends React.Component {
  onTermClick = (e) => {
    // this.utt.text = term.content;
    // window.speechSynthesis.speak(this.utt);
    const { setBookmark, id, selectTerm, term, onClick } = this.props;
    selectTerm(term.index);
    setBookmark(id, term.index);
    onClick(e);
  };

  storageButtonRef = (ref) => {
    const { bookmark, bookmarkRef, last } = this.props;
    if (bookmark) bookmarkRef.current = ref;
    if (last) last.current = ref;
  };

  render() {
    const { term, bookmark } = this.props;

    return (
      <button
        type="button"
        className={`${styles.term} ${styles[`term-${term.learningLevel}`]} ${
          bookmark ? styles.bookmark : null
        }`}
        style={
          term.count
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
};

export default connect((state) => ({ id: state.text.readingText.id }), {
  setBookmark: setBookmarkAction,
  selectTerm: selectTermAction,
})(TermButton);
