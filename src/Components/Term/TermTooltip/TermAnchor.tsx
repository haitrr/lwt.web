import React from "react";
import TermButton from "../TermButton";
import { Term } from "../../../Reducers/TextReducer";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  bookmark: boolean;
  term: Term;
  onClick: () => void;
}

const TermAnchor: React.FC<Props> = ({
  onMouseEnter,
  onMouseLeave,
  bookmark,
  term,
  onClick,
}) => {
  return (
    <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <TermButton
        bookmark={bookmark}
        term={term}
        onClick={onClick}
      />
    </span>
  );
};

export default TermAnchor;
