import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTermMeaningAction,
  setEditingTermAction
} from "../../Actions/TermAction";
import { getTermCountInTextAction } from "../../Actions/TextAction";
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
      nextProps.term.count !== term.count ||
      nextProps.bookmark !== bookmark ||
      last !== nextProps.last
    );
  }

  handleHover = () => {
    const { term } = this.props;
    if (term.meaning === null) {
      this.loadTermsMeaning();
    }
    if (!term.count) {
      this.loadTermCountInText();
    }
  };

  loadTermCountInText = () => {
    const { getTermCountInText, term, textId } = this.props;
    if (term.id && !term.count) {
      getTermCountInText(term.id, textId);
    }
  };

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
    const {
      setEditingTerm,
      index,
      term,
      onTermClick,
      getTermMeaning
    } = this.props;
    // load term meaning if not loaded.
    if (!term.count) {
      this.loadTermCountInText();
    }
    if (term.meaning === null) {
      getTermMeaning(term, index);
    }
    onTermClick(term);
    setEditingTerm(index);
  };

  render() {
    const { term, bookmark, last, bookmarkRef, index } = this.props;
    if (term.learningLevel === TermLearningLevel.Skipped) {
      return <SkippedTerm term={term} last={last} />;
    }
    if (
      term.learningLevel === TermLearningLevel.WellKnow ||
      term.learningLevel === TermLearningLevel.Ignored ||
      window.innerWidth < 768
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
        onHover={this.handleHover}
        index={index}
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
  term: PropTypes.shape({
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  bookmark: PropTypes.bool,
  bookmarkRef: PropTypes.shape({}).isRequired,
  last: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  getTermMeaning: PropTypes.func.isRequired,
  onTermClick: PropTypes.func.isRequired,
  getTermCountInText: PropTypes.func.isRequired,
  textId: PropTypes.number.isRequired
};

export default connect(
  (state, ownProps) => ({
    term: state.text.readingText.terms[ownProps.index],
    bookmark: state.text.readingText.bookmark === ownProps.index,
    textId: state.text.readingText.id
  }),
  {
    setEditingTerm: setEditingTermAction,
    getTermMeaning: getTermMeaningAction,
    getTermCountInText: getTermCountInTextAction
  }
)(Term);
