import React from 'react';
import { TermLearningLevel } from '../../../Enums';
import { TextItem } from '../../../Reducers/TextReducer';
import useTextTermsCountByLearningLevel from '../../../Hooks/useTextTermsCountByLearningLevel';

interface Props {
  record: TextItem;
}

const TotalTerm: React.FC<Props> = ({ record }) => {
  const { counts } = useTextTermsCountByLearningLevel(record.id);

  if (!counts) {
    return <span>-</span>;
  }
  let sum = 0;
  Object.keys(counts).map((key) => {
    if (key !== TermLearningLevel.Skipped) sum += counts[key];
    return null;
  });
  return <span>{sum}</span>;
};

export default TotalTerm;
