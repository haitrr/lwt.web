import React from "react";
import { TermLearningLevel } from "../../../Enums";
import termStyles from "../../Term/Term.module.scss";
import { TextItem } from "../../../Reducers/TextReducer";

const TermNumber = (props: { text: TextItem; learningLevel: string }) => {
  const { text, learningLevel } = props;
  const { counts } = text;
  if (!counts) {
    return <span>-</span>;
  }
  const current = counts[learningLevel];
  if (!current) {
    return <span>0</span>;
  }

  const sum =
    text.termCount -
    counts[TermLearningLevel.Ignored] -
    counts[TermLearningLevel.Skipped];
  return (
    <div className={`${termStyles[`term-${learningLevel}`]}`}>
      {`${current}`}
      <br />
      ~
      <br />
      {`${Math.round((current / sum) * 100)}%`}
    </div>
  );
};

export default TermNumber;
