import { UserSetting } from './../RootReducer';
import { getSettingAsync } from '../Apis/UserApi';
import { useQuery } from 'react-query';

const useUserSettings = () => {
  const { data, error, isLoading } = useQuery<UserSetting, Error>(
    'userSettings',
    () => {
      return getSettingAsync();
    },
    { staleTime: 6000000 },
  );

  return { userSettings: data, error, isLoading };
};

export default useUserSettings;
