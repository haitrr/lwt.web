import React from "react";

/**
 * term edit page.
 */
const TermEditPage = props => {
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
