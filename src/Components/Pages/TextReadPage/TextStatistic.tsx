import React from 'react';
import { TermLearningColor, TermLearningLevel } from '../../../Enums';
import SingleBarChart from '../../SingleBarChart';
import styles from '../../Term/Term.module.scss';
import Loading from '../../Loading/Loading';
import useTextTermsCountByLearningLevel from '../../../Hooks/useTextTermsCountByLearningLevel';
import useTextTermsCount from '../../../Hooks/useTextTermsCount';

function getPracticeCount(termCount: number, termCountByLearningLevel: any) {
  return (
    termCount -
    termCountByLearningLevel[TermLearningLevel.Skipped] -
    termCountByLearningLevel[TermLearningLevel.Ignored] -
    termCountByLearningLevel[TermLearningLevel.WellKnow]
  );
}

interface Props {
  textId: number;
}

const TextStatistic: React.FC<Props> = ({ textId }) => {
  const { counts } = useTextTermsCountByLearningLevel(textId);
  const { termCount } = useTextTermsCount(textId);

  if (!counts || !termCount) {
    return (
      <div style={{ height: '2rem' }}>
        <Loading />
      </div>
    );
  }
  const termCountByLearningLevel = counts;
  const statistic: any = [];
  const learningStatistic = [];
  Object.keys(TermLearningLevel).forEach((learningLevel) => {
    if (learningLevel === 'Skipped' || learningLevel === 'Ignored' || learningLevel === 'WellKnow') return;
    statistic.push({
      name: learningLevel,
      value: termCountByLearningLevel[TermLearningLevel[learningLevel]],
      color: TermLearningColor[TermLearningLevel[learningLevel]],
    });
  });
  const practice = getPracticeCount(termCount, termCountByLearningLevel);
  learningStatistic.push({
    name: 'Learned',
    color: styles.termLearned,
    value: termCountByLearningLevel[TermLearningLevel.WellKnow],
  });
  learningStatistic.push({
    name: 'Learning',
    color: styles.termLearning,
    value: practice,
  });
  return (
    <div style={{ width: '100%' }} key="statistic">
      <SingleBarChart data={learningStatistic} />
      <SingleBarChart data={statistic} />
    </div>
  );
};

export default TextStatistic;
