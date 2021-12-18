import {useQuery} from "react-query";
import useLanguages from "./useLanguages";
import {getTermCountByLanguages} from "../Apis/TermApi";

const useTermCounts = () => {
  const {languages, isLoading, error} = useLanguages();
  if(error) {
    throw error;
  }
  return useQuery("termCount", async () => {
    const termCounts = await getTermCountByLanguages();
    return Object.keys(termCounts).map(key => {
      return {
        languageCode: key,
        languageName: languages!.find(l => l.code === key)!.name,
        count: termCounts[key]
      }
    })
  }, {staleTime: 60000,enabled: !isLoading})
}

export default useTermCounts;
