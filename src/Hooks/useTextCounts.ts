import {useQuery} from "react-query";
import {getTextCountByLanguages} from "../Apis/TextApi";
import useLanguages from "./useLanguages";

const useTextCounts = () => {
  const {data: languages, isLoading, error} = useLanguages();
  if(error) {
    throw error;
  }
  return useQuery("textCount", async () => {
    const textCounts = await getTextCountByLanguages();
    return Object.keys(textCounts).map(key => {
      return {
        languageCode: key,
        languageName: languages!.find(l => l.code === key)!.name,
        count: textCounts[key]
      }
    })
  }, {staleTime: 60000,enabled: !isLoading})
}

export default useTextCounts;
