import { TextFilter } from './../Actions/TextAction';
import { useQuery } from 'react-query';
import { GetTextResponse, getTextsAsync } from '../Apis/TextApi';

const useTexts = (filters: TextFilter, page: number, itermPerPage: number) => {
  const { data, error, isLoading, refetch } = useQuery<GetTextResponse, Error>(
    `texts:${JSON.stringify(filters)}:${page}:${itermPerPage}`,
    () => {
      return getTextsAsync(filters, page, itermPerPage);
    },
    { staleTime: 6000000 },
  );

  return { texts: data, error, isLoading, refetch };
};

export default useTexts;
