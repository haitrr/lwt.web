import React from "react";
import TermButton from "../TermButton";
import { Term } from "../../../Reducers/TextReducer";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  bookmark: boolean;
  bookmarkRef: React.RefObject<HTMLSpanElement>;
  last: React.RefObject<HTMLSpanElement>;
  term: Term;
  onClick: () => void;
}

const TermAnchor: React.FC<Props> = ({
  onMouseEnter,
  onMouseLeave,
  bookmark,
  bookmarkRef,
  last,
  term,
  onClick,
}) => {
  return (
    <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <TermButton
        bookmark={bookmark}
        bookmarkRef={bookmarkRef}
        last={last}
        term={term}
        onClick={onClick}
      />
    </span>
  );
};

export default TermAnchor;
