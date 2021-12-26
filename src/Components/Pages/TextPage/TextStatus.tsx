import React from 'react';
import { TextItem } from '../../../Reducers/TextReducer';
import useTextProcessedTermCount from '../../../Hooks/useTextProcessedTermsCount';
import useTextTermsCount from '../../../Hooks/useTextTermsCount';
import { useQueryClient } from 'react-query';

interface Props {
  text: TextItem;
}

const TextStatus: React.FC<Props> = ({ text }) => {
  const { processedTermCount, refetch: refetchProcessedTermsCount } = useTextProcessedTermCount(text.id);
  const { termCount, refetch: refetchTermCount } = useTextTermsCount(text.id);
  const [getTermCountInterval, setGetTermCountInterval] = React.useState<number | undefined>();
  const queryClient = useQueryClient();
  const [getProcessedTermCountInterval, setGetProcessedTermCountInterval] = React.useState<number | undefined>();
  React.useEffect(() => {
    if (termCount === 0) {
      if (!getTermCountInterval) {
        const interval: number = window.setInterval(() => {
          refetchTermCount();
        }, 2000);
        setGetTermCountInterval(interval);
      }
    } else {
      clearInterval(getTermCountInterval);
    }
  }, [termCount, getTermCountInterval, refetchTermCount]);

  React.useEffect(
    () => () => {
      clearInterval(getTermCountInterval);
      clearInterval(getProcessedTermCountInterval);
    },
    [getProcessedTermCountInterval, getTermCountInterval],
  );

  React.useEffect(() => {
    if (termCount !== undefined && processedTermCount !== undefined) {
      if (processedTermCount < termCount) {
        if (!getProcessedTermCountInterval) {
          const interval = window.setInterval(() => {
            refetchProcessedTermsCount();
            queryClient.fetchQuery(`textTermsCountByLL:${text.id}`);
          }, 2000);
          setGetProcessedTermCountInterval(interval);
        }
      } else {
        clearInterval(getProcessedTermCountInterval);
      }
    }
  }, [getProcessedTermCountInterval, processedTermCount, refetchProcessedTermsCount, termCount, queryClient, text.id]);

  if (termCount === undefined || processedTermCount === undefined) {
    return <span>-</span>;
  }

  if (termCount === 0) {
    return <span style={{ backgroundColor: '#FF0101' }}>Processing</span>;
  }
  if (termCount === processedTermCount) {
    return <span style={{ backgroundColor: '#009700' }}>Done</span>;
  }
  return (
    <span style={{ backgroundColor: '#5AB7D4' }}>
      {`${processedTermCount}/${termCount}(${Math.floor((processedTermCount * 100) / termCount)}%)`}
    </span>
  );
};

export default TextStatus;
