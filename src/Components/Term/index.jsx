import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTermAction,
  getTermMeaningAction,
  setEditingTermAction
} from "../../Actions/TermAction";
import { TermLearningLevel } from "../../Enums";
import TermButton from "./TermButton";
import TermTooltip from "./TermTooltip";
import SkippedTerm from "./SkippedTerm";

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
    const { getTerm, setEditingTerm, index, term } = this.props;
    // load term meaning if not loaded.
    this.loadTermsMeaning();
    setEditingTerm(index);
    if (term.id) {
      getTerm(term.id, index);
    }
  };

  render() {
    const { term, bookmark, last, bookmarkRef } = this.props;
    if (term.learningLevel === TermLearningLevel.Skipped) {
      return <SkippedTerm term={term} last={last} />;
    }
    if (
      term.learningLevel === TermLearningLevel.WellKnow ||
      term.learningLevel === TermLearningLevel.UnKnow ||
      term.learningLevel === TermLearningLevel.Ignored
    ) {
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
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string
  }).isRequired,
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
