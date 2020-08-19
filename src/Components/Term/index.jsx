import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTermAction,
  getTermMeaningAction,
  setEditingTermAction
} from "../../Actions/TermAction";
import styles from "./Term.module.scss";
import { TermLearningLevel } from "../../Enums";
import TermButton from "./TermButton";
import TermTooltip from "./TermTooltip";

class Term extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { term, bookmark, last } = this.props;
    return (
      nextProps.term.learningLevel !== term.learningLevel ||
      nextProps.term.meaning !== term.meaning ||
      nextProps.bookmark !== bookmark ||
      last !== nextProps.last
    );
  }

  loadTermsMeaning = () => {
    const { term, getTermMeaning, index } = this.props;
    if (
      term.id &&
      term.meaning === undefined &&
      term.learningLevel !== TermLearningLevel.Ignored &&
      term.learningLevel !== TermLearningLevel.Skipped &&
      term.learningLevel !== TermLearningLevel.WellKnow
    ) {
      getTermMeaning(term, index);
    }
  };

  handleTermClick = e => {
    e.preventDefault();
    const { getTerm, setEditingTerm, index, term, onTermClick } = this.props;
    onTermClick(term);
    // load term meaning if not loaded.
    this.loadTermsMeaning();
    setEditingTerm(index);
    if (term.id) {
      getTerm(term.id, index);
    }
  };

  getTitle = () => {
    const { term } = this.props;

    return term.meaning && term.meaning.length > 0 ? term.meaning : null;
  };

  render() {
    const { term, bookmark, last, bookmarkRef } = this.props;

    if (term.learningLevel === TermLearningLevel.Skipped) {
      return (
        <span
          className={styles.term}
          ref={r => {
            if (last) {
              last.current = r;
            }
          }}
        >
          {term.content}
        </span>
      );
    }
    if (term.learningLevel === TermLearningLevel.WellKnow) {
      return (
        <TermButton
          bookmark={bookmark}
          bookmarkRef={bookmarkRef}
          last={last}
          term={term}
          onClick={this.handleTermClick}
        />
      );
    }
    return (
      <TermTooltip
        onClick={this.handleTermClick}
        bookmarkRef={bookmarkRef}
        onHover={this.loadTermsMeaning}
        term={term}
        last={last}
        bookmark={bookmark}
      />
    );
  }
}

Term.defaultProps = {
  bookmark: false,
  last: null
};

Term.propTypes = {
  setEditingTerm: PropTypes.func.isRequired,
  getTerm: PropTypes.func.isRequired,
  term: PropTypes.shape({
    learningLevel: PropTypes.number.isRequired,
    meaning: PropTypes.string
  }).isRequired,
  onTermClick: PropTypes.func.isRequired,
  bookmark: PropTypes.bool,
  bookmarkRef: PropTypes.shape({}).isRequired,
  last: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  getTermMeaning: PropTypes.func.isRequired
};

export default connect(
  (state, ownProps) => ({
    term: state.text.readingText.terms[ownProps.index],
    bookmark: state.text.readingText.bookmark === ownProps.index
  }),
  {
    getTerm: getTermAction,
    setEditingTerm: setEditingTermAction,
    getTermMeaning: getTermMeaningAction
  }
)(Term);
