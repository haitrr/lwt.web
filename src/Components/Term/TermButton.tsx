import React from "react";
import { connect } from "react-redux";
import styles from "./Term.module.scss";
import { setBookmarkAction, selectTermAction } from "../../Actions/TextAction";
import { importantColors, isLearningTerm } from "../../Enums";
import { TextTermState } from "../../Reducers/TextReducer";
import { RootState } from "../../RootReducer";

interface TermButtonProps {
  bookmark: boolean;
  bookmarkRef: React.MutableRefObject<any>;
  last: React.MutableRefObject<any>;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  term: TextTermState;
  setBookmark: Function;
  selectTerm: Function;
  id: number;
  learningLevel: string;
}

class TermButton extends React.Component<TermButtonProps> {
  onTermClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { setBookmark, id, selectTerm, term, onClick } = this.props;
    selectTerm(term.indexFrom);
    setBookmark(id, term.indexFrom);
    onClick(e);
  };

  storageButtonRef = (ref: HTMLButtonElement) => {
    const { bookmark, bookmarkRef, last } = this.props;
    if (bookmark) {
      bookmarkRef.current = ref;
    }
    if (last) last.current = ref;
  };

  render() {
    const { term, bookmark, learningLevel } = this.props;

    return (
      <button
        type="button"
        className={`${styles.term} ${styles[`term-${learningLevel}`]} ${
          isLearningTerm(learningLevel) ? "not-invert" : ""
        } ${bookmark ? styles.bookmark : null}`}
        style={
          term.count && isLearningTerm(learningLevel)
            ? {
                borderBottom: `solid 2px ${
                  importantColors[Math.min(term.count, 49)]
                }`,
                marginBottom: "-2px",
              }
            : undefined
        }
        ref={this.storageButtonRef}
        onClick={this.onTermClick}
      >
        {
          // need react fragment here to prevent stupid ant design
          // to insert a space between two chinese characters.
        }
        {term.content}
      </button>
    );
  }
}

export default connect(
  (state: RootState) => {
    if (!state.text.readingText) throw new Error();
    return { id: state.text.readingText.id };
  },
  {
    setBookmark: setBookmarkAction,
    selectTerm: selectTermAction,
  }
)(TermButton);
