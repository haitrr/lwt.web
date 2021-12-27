import { VictoryPie } from 'victory';
import useVictoryTheme from '../../../Hooks/useVictoryTheme';
import Loading from '../../Loading/Loading';
import { toast } from 'react-toastify';
import React from 'react';
import useTermsCountByLearningLevels from '../../../Hooks/useTermsCountByLearningLevels';

const TermCountByLearningLevel: React.VFC = () => {
  const { isLoading, error, data } = useTermsCountByLearningLevels();
  const theme = useVictoryTheme();
  if (isLoading || !data) {
    return <Loading />;
  }
  if (error) {
    toast.error('failed to load term counts');
    return <div>Error</div>;
  }
  const pieData = data.map((tc) => {
    return { label: `${tc.learningLevel}\n ${tc.count}`, y: tc.count };
  });

  return <VictoryPie width={400} height={400} padding={100} innerRadius={50} theme={theme} data={pieData} />;
};

export default TermCountByLearningLevel;
