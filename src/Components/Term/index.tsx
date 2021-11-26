import React from "react";
import {connect} from "react-redux";
import {
  getTermMeaningAction,
  setEditingTermAction,
} from "../../Actions/TermAction";
import {getTermCountInTextAction} from "../../Actions/TextAction";
import {TermLearningLevel} from "../../Enums";
import TermButton from "./TermButton";
import TermTooltip from "./TermTooltip";
import SkippedTerm from "./SkippedTerm";
import {RootState} from "../../RootReducer";
import {Term as TermState} from "../../Reducers/TextReducer";

interface StateProps {
  textId: number;
  bookmark: boolean;
  isLastBeginIndex: boolean;
  term: TermState;
}

interface OwnProps {
  index: number;
  onSpeak: (term: TermState) => void;
}

interface DispatchProps {
  setEditingTerm: Function;
  getTermMeaning: (term: TermState, index: number) => void;
  getTermCountInText: (termId: number, textId: number) => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const Term: React.FC<Props> = (
  {
    term,
    setEditingTerm,
    getTermMeaning,
    index,
    getTermCountInText,
    textId,
    onSpeak, bookmark, isLastBeginIndex
  }) => {
  const handleHover = () => {
    if (term.meaning === null) {
      loadTermsMeaning();
    }
    if (!term.count) {
      loadTermCountInText();
    }
    onSpeak(term);
  };

  const loadTermCountInText = () => {
    if (term.id && !term.count) {
      getTermCountInText(term.id, textId);
    }
  };

  const loadTermsMeaning = () => {
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

  const handleTermClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    // load term meaning if not loaded.
    if (!term.count) {
      loadTermCountInText();
    }
    if (term.meaning === null) {
      getTermMeaning(term, index);
    }
    onSpeak(term);
    setEditingTerm(index);
  };

  if (term.learningLevel === TermLearningLevel.Skipped) {
    return <SkippedTerm term={term} isLastBeginTerm={isLastBeginIndex}/>;
  }
  if (
    term.learningLevel === TermLearningLevel.WellKnow ||
    term.learningLevel === TermLearningLevel.Ignored ||
    window.innerWidth < 768
  ) {
    return (
      <TermButton
        bookmark={bookmark}
        term={term}
        onClick={handleTermClick}
      />
    );
  }

  return (
    <TermTooltip
      onClick={handleTermClick}
      onHover={handleHover}
      onSpeak={onSpeak}
      index={index}
      term={term}
      bookmark={bookmark}
    />
  );
}

export default connect(
  (state: RootState, ownProps: OwnProps) => {
    if (!state.text.readingText) {
      throw new Error();
    }

    return {
      term: state.text.readingText.terms[ownProps.index],
      bookmark: state.text.readingText.bookmark === ownProps.index,
      isLastBeginIndex:
        state.text.readingText.termLastBeginIndex === ownProps.index,
      textId: state.text.readingText.id,
    };
  },
  {
    setEditingTerm: setEditingTermAction,
    getTermMeaning: getTermMeaningAction,
    getTermCountInText: getTermCountInTextAction,
  }
)(React.memo(Term, (prevProps, nextProps) => {
  const {term, bookmark, isLastBeginIndex} = prevProps;
  return !(
    nextProps.term.learningLevel !== term.learningLevel ||
    nextProps.term.meaning !== term.meaning ||
    nextProps.term.count !== term.count ||
    nextProps.bookmark !== bookmark ||
    isLastBeginIndex !== nextProps.isLastBeginIndex
  );
}));
