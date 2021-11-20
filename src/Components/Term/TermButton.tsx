import React from "react";
import {connect} from "react-redux";
import classNames from "classnames";
import styles from "./Term.module.scss";
import {setBookmarkAction, selectTermAction} from "../../Actions/TextAction";
import {
  importantColors,
  isLearningTerm,
  TermLearningColor,
} from "../../Enums";
import {RootState} from "../../RootReducer";
import {Term} from "../../Reducers/TextReducer";

export const LAST_BEGIN_INDEX_ID = "last-begin-index";

interface StateProps {
  id: number;
  isLastBeginIndex: boolean;
}

interface OwnProps {
  term: Term;
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
  bookmark: boolean;
}

interface DispatchProps {
  setBookmark: (textId: number, termIndex: number) => void;
  selectTerm: (termIndex: number) => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const TermButton: React.FC<Props> = ({setBookmark, id, bookmark, isLastBeginIndex, selectTerm, term, onClick}) => {
  const buttonRef = React.useRef<HTMLSpanElement>(null);

  const onTermClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    selectTerm(term.index);
    setBookmark(id, term.index);
    onClick(e);
  };

  const className = classNames(
    styles.term,
    TermLearningColor[term.learningLevel],
    {
      [styles.bookmark]: bookmark,
      [styles.termCount]: term.count && isLearningTerm(term.learningLevel),
    }
  );

  let termId;
  if (bookmark) {
    termId = "bookmark";
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
}

export default connect(
  (state: RootState, ownProps: OwnProps) => {
    if (!state.text.readingText) {
      throw new Error();
    }

    return {
      id: state.text.readingText.id,
      isLastBeginIndex:
        state.text.readingText.termLastBeginIndex === ownProps.term.index,
    };
  },
  {
    setBookmark: setBookmarkAction,
    selectTerm: selectTermAction,
  }
)(TermButton);
