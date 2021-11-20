import React from "react";
import {Term} from "../../../Reducers/TextReducer";

interface Props {
  term: Term
}

/**
 * term edit page.
 */
const TermEditPage = (props: Props) => {
  const {term} = props;

  return (
    <div>
      <p>{term.content}</p>
      <p>{term.meaning}</p>
      <p>{term.learningLevel}</p>
    </div>
  );
};

export { TermEditPage };
