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

export const LAST_BEGIN_INDEX_ID = "last-begin-index";

class TermButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  onTermClick = (e) => {
    const { setBookmark, id, selectTerm, term, onClick } = this.props;
    selectTerm(term.index);
    setBookmark(id, term.index);
    onClick(e);
  };

  render() {
    const { term, bookmark, isLastBeginIndex } = this.props;
    const className = classNames(
      styles.term,
      TermLearningColor[term.learningLevel],
      { [styles.bookmark]: bookmark }
    );

    let id;
    if (bookmark) {
      id = "bookmark";
    } else if (isLastBeginIndex) {
      id = LAST_BEGIN_INDEX_ID;
    }

    return (
      <span
        tabIndex="-1"
        role="button"
        id={id}
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

TermButton.defaultProps = {};

TermButton.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  term: PropTypes.shape({}).isRequired,
  setBookmark: PropTypes.func.isRequired,
  selectTerm: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(
  (state, ownProps) => ({
    id: state.text.readingText.id,
    isLastBeginIndex:
      state.text.readingText.termLastBeginIndex === ownProps.term.index,
  }),
  {
    setBookmark: setBookmarkAction,
    selectTerm: selectTermAction,
  }
)(TermButton);
