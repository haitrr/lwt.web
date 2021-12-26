import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './Term.module.scss';
import { setBookmarkAction, selectTermAction } from '../../Actions/TextAction';
import { importantColors, isLearningTerm, TermLearningColor } from '../../Enums';
import { RootState } from '../../RootReducer';
import { Term } from '../../Reducers/TextReducer';

export const LAST_BEGIN_INDEX_ID = 'last-begin-index';

interface OwnProps {
  term: Term;
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
  bookmark: boolean;
}

type Props = OwnProps;

const TermButton: React.FC<Props> = ({ bookmark, term, onClick }) => {
  const buttonRef = React.useRef<HTMLSpanElement>(null);
  const dispatch = useDispatch();
  const { id, isLastBeginIndex } = useSelector((state: RootState) => {
    if (!state.text.readingText) {
      throw new Error();
    }

    return {
      id: state.text.readingText.id,
      isLastBeginIndex: state.text.readingText.termLastBeginIndex === term.index,
    };
  }, shallowEqual);

  const onTermClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    dispatch(selectTermAction(term.index));
    dispatch(setBookmarkAction(id, term.index));
    onClick(e);
  };

  const className = classNames(styles.term, TermLearningColor[term.learningLevel], {
    [styles.bookmark]: bookmark,
    [styles.termCount]: term.count && isLearningTerm(term.learningLevel),
  });

  let termId;
  if (bookmark) {
    termId = 'bookmark';
  } else if (isLastBeginIndex) {
    termId = LAST_BEGIN_INDEX_ID;
  }

  const s =
    term.count && isLearningTerm(term.learningLevel)
      ? {
          borderBottomColor: importantColors[Math.min(term.count, 49)],
        }
      : undefined;

  return (
    <span
      tabIndex={-1}
      role="button"
      id={termId}
      className={className}
      style={s}
      ref={buttonRef}
      onClick={onTermClick}
      onKeyDown={onTermClick}
    >
      {term.content}
    </span>
  );
};

export default TermButton;
