import React from "react";
import { connect } from "react-redux";
import {
  getTermMeaningAction,
  setEditingTermAction,
} from "../../Actions/TermAction";
import { getTermCountInTextAction } from "../../Actions/TextAction";
import { TermLearningLevel } from "../../Enums";
import TermButton from "./TermButton";
import TermTooltip from "./TermTooltip";
import SkippedTerm from "./SkippedTerm";

interface TermProps {
  bookmark: number;
  term: any;
  last: any;
  onSpeak: (term: any) => void;
  getTermCountInText: (id: number, textId: number) => void;
  textId: number;
  getTermMeaning: Function;
  setEditingTerm: Function;
  bookmarkRef: any;
  index: number;
  textTermId: number;
}

class Term extends React.Component<TermProps> {
  shouldComponentUpdate(nextProps: TermProps) {
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
    const { term, onSpeak } = this.props;
    if (term.meaning === null) {
      this.loadTermsMeaning();
    }
    if (!term.count) {
      this.loadTermCountInText();
    }
    onSpeak(term);
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

  handleTermClick = (e: any) => {
    e.preventDefault();
    const { setEditingTerm, index, term, onSpeak, getTermMeaning } = this.props;
    // load term meaning if not loaded.
    if (!term.count) {
      this.loadTermCountInText();
    }
    if (term.meaning === null) {
      getTermMeaning(term, index);
    }
    onSpeak(term);
    setEditingTerm(term.indexFrom);
  };

  render() {
    const { term, bookmark, last, bookmarkRef, index, onSpeak } = this.props;
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
        onSpeak={onSpeak}
        index={index}
        term={term}
        last={last}
        bookmark={bookmark}
      />
    );
  }
}

export default connect(
  (state: any, ownProps: TermProps) => ({
    term: state.text.readingText.terms.find(
      (t: any) => t.textTermId === ownProps.textTermId
    ),
    bookmark: state.text.readingText.bookmark === ownProps.term?.indexFrom,
    textId: state.text.readingText.id,
  }),
  {
    setEditingTerm: setEditingTermAction,
    getTermMeaning: getTermMeaningAction,
    getTermCountInText: getTermCountInTextAction,
  }
)(Term as any);