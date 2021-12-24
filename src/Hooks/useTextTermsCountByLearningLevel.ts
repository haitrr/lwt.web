import { useQuery } from "react-query";
import { getTermCountByLearningLevelAsync } from '../Apis/TextApi';

const useTextTermsCountByLearningLevel = (textId: number) => {
  const { data, error, isLoading, refetch } = useQuery(`textTermsCountByLL:${textId}`, () => {
    return getTermCountByLearningLevelAsync(textId);
  }, { staleTime: 6000000, })

  return { counts: data?.counts, error, isLoading, refetch };
}

export default useTextTermsCountByLearningLevel;
