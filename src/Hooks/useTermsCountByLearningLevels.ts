import { useQuery } from 'react-query';
import { getTermsCountByLearningLevels } from '../Apis/TermApi';
import { TermLearningLevelShortcut } from '../Enums';

const useTermsCountByLearningLevels = () => {
  return useQuery(
    'termsCountByLearningLevels',
    async () => {
      const counts = await getTermsCountByLearningLevels();
      return Object.keys(counts).map((k) => {
        return {
          learningLevel: TermLearningLevelShortcut[k],
          count: counts[k],
        };
      });
    },
    { staleTime: 60000 },
  );
};

export default useTermsCountByLearningLevels;
