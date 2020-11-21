import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./Term.module.scss";
import { setBookmarkAction, selectTermAction } from "../../Actions/TextAction";
import {
  importantColors,
  isLearningTerm,
  TermLearningColor,
} from "../../Enums";

class TermButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  onTermClick = (e) => {
    // this.utt.text = term.content;
    // window.speechSynthesis.speak(this.utt);
    const { setBookmark, id, selectTerm, term, onClick } = this.props;
    selectTerm(term.index);
    setBookmark(id, term.index);
    onClick(e);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { bookmark, bookmarkRef, last } = this.props;
    if (bookmark) {
      console.log("setting");
      bookmarkRef.current = this.buttonRef.current;
    }
    if (last) last.current = this.buttonRef.current;
  }

  render() {
    const { term, bookmark } = this.props;
    const className = classNames(
      styles.term,
      TermLearningColor[term.learningLevel],
      { [styles.bookmark]: bookmark }
    );

    return (
      <span
        tabIndex="-1"
        role="button"
        className={className}
        style={
          term.count && isLearningTerm(term.learningLevel)
            ? {
                borderBottom: `solid 2px ${
                  importantColors[Math.min(term.count, 49)]
                }`,
                marginBottom: "-2px",
              }
            : null
        }
        ref={this.buttonRef}
        onClick={this.onTermClick}
        onKeyDown={this.onTermClick}
      >
        {
          // need react fragment here to prevent stupid ant design
          // to insert a space between two chinese characters.
        }
        {term.content}
      </span>
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
