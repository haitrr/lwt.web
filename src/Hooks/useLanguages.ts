import { useQuery } from 'react-query';
import { getUserLanguageAsync } from '../Apis/LanguageApi';
import { Language } from '../RootReducer';

const useLanguages = () => {
  const { data, error, isLoading } = useQuery<Language[], Error>(
    'languages',
    () => {
      return getUserLanguageAsync();
    },
    { staleTime: 6000000 },
  );

  return { languages: data, error, isLoading };
};

export default useLanguages;
