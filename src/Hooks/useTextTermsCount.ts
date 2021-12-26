import { useQuery } from 'react-query';
import { getTermCountAsync } from '../Apis/TextApi';

const useTextTermsCount = (textId: number) => {
  const { data, error, isLoading, refetch } = useQuery(
    `textTermsCount:${textId}`,
    () => {
      return getTermCountAsync(textId);
    },
    { staleTime: 6000000 },
  );

  return { termCount: data?.termCount, error, isLoading, refetch };
};

export default useTextTermsCount;
