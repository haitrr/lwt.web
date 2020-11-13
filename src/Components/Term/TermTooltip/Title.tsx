import React from "react";
import { importantColors } from "../../../Enums";
import { Term } from "../../../Reducers/TextReducer";

interface Props {
  term: Term;
}

const Title: React.FC<Props> = ({ term }) => {
  return (
    <span>
      {term.count ? (
        <div style={{ color: importantColors[Math.min(term.count, 49)] }}>
          {`${term.count} in this text.`}
        </div>
      ) : (
        <div>Loading term count</div>
      )}
      <hr />
      <span>{term.meaning}</span>
      <hr />
    </span>
  );
};

export default Title;
