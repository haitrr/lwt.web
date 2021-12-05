import {useQuery} from "react-query";
import {getUserLanguageAsync} from "../Apis/LanguageApi";
import {Language} from "../RootReducer";

const useTextCounts = () => {
  return useQuery<Language[], Error>("languages", () => {
    return getUserLanguageAsync();
  }, {staleTime: 6000000})
}

export default useTextCounts;
