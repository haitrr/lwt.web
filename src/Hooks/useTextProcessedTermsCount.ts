import { useQuery } from 'react-query';
import { getProcessedTermCountAsync } from '../Apis/TextApi';
const useTextProcessedTermsCount = (textId: number) => {
  const { data, error, isLoading, refetch } = useQuery(
    `textProcessedTermsCount:${textId}`,
    () => {
      return getProcessedTermCountAsync(textId);
    },
    { staleTime: 6000000 },
  );

  return { processedTermCount: data?.processedTermCount, error, isLoading, refetch };
};

export default useTextProcessedTermsCount;
