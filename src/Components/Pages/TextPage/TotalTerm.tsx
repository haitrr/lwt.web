import React from "react";
import {connect} from "react-redux";
import {loadTermCountAction} from "../../../Actions/TextAction";
import {TermLearningLevel} from "../../../Enums";
import {TextItem} from "../../../Reducers/TextReducer";

interface Props {
  value: { [key: string]: number } | null;
  record: TextItem;
  loadTermCounts: (id: number) => void;
}

const TotalTerm: React.FC<Props> = ({value, record, loadTermCounts}) => {
  React.useEffect(() => {
    if (value === null) {
      loadTermCounts(record.id);
    }
  }, [loadTermCounts, record.id, value])

  React.useEffect(() => {
    if (
      value === undefined ||
      record.termCount === 0 ||
      (record.processedTermCount < record.termCount)
    ) {
      loadTermCounts(record.id);
    }
  }, [record?.processedTermCount, record.id, record.termCount, value, loadTermCounts])

  if (!value) {
    return <span>-</span>;
  }
  let sum = 0;
  Object.keys(value).map((key) => {
    if (key !== TermLearningLevel.Skipped) sum += value[key];
    return null;
  });
  return <span>{sum}</span>;
}

export default connect(null, {loadTermCounts: loadTermCountAction})(
  TotalTerm
);
