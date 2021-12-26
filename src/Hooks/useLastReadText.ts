import { useQuery } from 'react-query';
import useLanguages from './useLanguages';
import { getLastReadTextAsync } from '../Apis/TextApi';

const useLastReadText = () => {
  const { languages, isLoading, error } = useLanguages();
  if (error) {
    throw error;
  }
  return useQuery(
    'lastReadText',
    async () => {
      const text = await getLastReadTextAsync();
      if (!text) {
        return null;
      }
      const language = languages!.find((l) => l.code === text?.languageCode);
      return { ...text, language: language!.name };
    },
    { staleTime: 60000, enabled: !isLoading },
  );
};

export default useLastReadText;
