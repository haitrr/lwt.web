import React from "react";
import classNames from "classnames";
import { TermLearningColor, TermLearningLevel } from "../../../Enums";
import styles from "./TextPage.module.scss";
import { TextItem } from "../../../Reducers/TextReducer";
import useTextTermsCount from "../../../Hooks/useTextTermsCountByLearningLevel";

const TermNumber = (props: { text: TextItem; learningLevel: string }) => {
  const { text, learningLevel } = props;
  const { counts } = useTextTermsCount(text.id);

  if (!counts) {
    return <div style={{ minWidth: "2rem" }}>-</div>;
  }
  const current = counts[learningLevel];
  if (!current) {
    return <div style={{ minWidth: "2rem" }}>0</div>;
  }

  const sum =
    text.termCount -
    counts[TermLearningLevel.Ignored] -
    counts[TermLearningLevel.Skipped];

  const className = classNames(
    styles.termNumber,
    TermLearningColor[learningLevel]
  );

  return (
    <div className={className}>
      {`${current}`}
      <br />
      ~
      <br />
      {`${Math.round((current / sum) * 100)}%`}
    </div>
  );
};

export default TermNumber;
