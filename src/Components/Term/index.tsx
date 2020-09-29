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
import { RootState } from "../../RootReducer";
import { TextTermState } from "../../Reducers/TextReducer";

interface TermOwnProps {
  bookmarkRef: any;
  last: any;
  term: TextTermState;
  onSpeak: (term: TextTermState) => void;
}

interface TermProps extends TermOwnProps {
  bookmark: boolean;
  getTermCountInText: (id: number, textId: number) => void;
  getTermMeaning: Function;
  setEditingTerm: Function;
  textId: number;
  meaning: string;
  learningLevel: string;
}

class Term extends React.Component<TermProps> {
  shouldComponentUpdate(nextProps: TermProps) {
    const { term, bookmark, last, learningLevel, meaning } = this.props;
    return (
      nextProps.learningLevel !== learningLevel ||
      nextProps.meaning !== meaning ||
      nextProps.term.count !== term.count ||
      nextProps.bookmark !== bookmark ||
      last !== nextProps.last
    );
  }

  handleHover = () => {
    const { term, onSpeak, meaning } = this.props;
    if (meaning === null) {
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
    const { term, getTermMeaning, meaning, learningLevel } = this.props;
    if (
      term.id &&
      meaning === undefined &&
      learningLevel !== TermLearningLevel.Ignored &&
      learningLevel !== TermLearningLevel.Skipped &&
      learningLevel !== TermLearningLevel.WellKnow
    ) {
      getTermMeaning(term, term.indexFrom);
    }
  };

  handleTermClick = (e: any) => {
    e.preventDefault();
    const {
      setEditingTerm,
      term,
      onSpeak,
      getTermMeaning,
      meaning,
    } = this.props;
    // load term meaning if not loaded.
    if (!term.count) {
      this.loadTermCountInText();
    }
    if (meaning === null) {
      getTermMeaning(term, term.indexFrom);
    }
    onSpeak(term);
    setEditingTerm(term);
  };

  render() {
    const {
      term,
      learningLevel,
      bookmark,
      meaning,
      last,
      bookmarkRef,
      onSpeak,
    } = this.props;

    if (learningLevel === TermLearningLevel.Skipped || !learningLevel) {
      return <SkippedTerm content={term.content} last={last} />;
    }
    if (
      learningLevel === TermLearningLevel.WellKnow ||
      learningLevel === TermLearningLevel.Ignored ||
      window.innerWidth < 768
    ) {
      return (
        <TermButton
          bookmark={bookmark}
          bookmarkRef={bookmarkRef}
          last={last}
          term={term}
          learningLevel={learningLevel}
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
        meaning={meaning}
        learningLevel={learningLevel}
        term={term}
        last={last}
        bookmark={bookmark}
      />
    );
  }
}

export default connect(
  (state: RootState, ownProps: TermOwnProps) => {
    if (state.text.readingText === null) throw new Error();
    const { id, bookmark, termValues } = state.text.readingText;
    const term = termValues[ownProps.term.id];
    return {
      bookmark: bookmark === ownProps.term.indexFrom,
      textId: id,
      ...term,
    };
  },
  {
    setEditingTerm: setEditingTermAction,
    getTermMeaning: getTermMeaningAction,
    getTermCountInText: getTermCountInTextAction,
  }
)(Term);
