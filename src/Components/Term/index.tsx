import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getTermMeaningAction, setEditingTermAction } from '../../Actions/TermAction';
import { getTermCountInTextAction } from '../../Actions/TextAction';
import { TermLearningLevel } from '../../Enums';
import TermButton from './TermButton';
import TermTooltip from './TermTooltip';
import SkippedTerm from './SkippedTerm';
import { RootState } from '../../RootReducer';
import { Term as TermState } from '../../Reducers/TextReducer';

interface OwnProps {
  index: number;
  onSpeak: (term: TermState) => void;
}

type Props = OwnProps;

const Term: React.FC<Props> = ({ index, onSpeak }) => {
  const dispatch = useDispatch();
  const { term, textId, bookmark, isLastBeginIndex } = useSelector((state: RootState) => {
    if (!state.text.readingText) {
      throw new Error();
    }

    return {
      term: state.text.readingText.terms[index],
      bookmark: state.text.readingText.bookmark === index,
      isLastBeginIndex: state.text.readingText.termLastBeginIndex === index,
      textId: state.text.readingText.id,
    };
  }, shallowEqual);
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
      dispatch(getTermCountInTextAction(term.id, textId));
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
      dispatch(getTermMeaningAction(term, index));
    }
  };

  const handleTermClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    // load term meaning if not loaded.
    if (!term.count) {
      loadTermCountInText();
    }
    if (term.meaning === null) {
      dispatch(getTermMeaningAction(term, index));
    }
    onSpeak(term);
    dispatch(setEditingTermAction(index));
  };

  if (term.learningLevel === TermLearningLevel.Skipped) {
    return <SkippedTerm term={term} isLastBeginTerm={isLastBeginIndex} />;
  }
  if (
    term.learningLevel === TermLearningLevel.WellKnow ||
    term.learningLevel === TermLearningLevel.Ignored ||
    window.innerWidth < 768
  ) {
    return <TermButton bookmark={bookmark} term={term} onClick={handleTermClick} />;
  }

  return <TermTooltip onClick={handleTermClick} onHover={handleHover} index={index} term={term} bookmark={bookmark} />;
};

export default Term;
