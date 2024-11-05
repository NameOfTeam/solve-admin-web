import { BaseResponse } from '../../types/common/base';

import useTokenStore from '../../stores/useTokenStore';
import { UserResponse } from '../../types/user/user';
import { useQuery } from '@tanstack/react-query';
import customAxios from '../../libs/customAxios';

const useGetMe = () => {
  const { accessToken } = useTokenStore();

  const getMe = async () => {
    const { data } = await customAxios.get<BaseResponse<UserResponse>>('/users/me');

    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['me', accessToken],
    queryFn: getMe,
    enabled: !!accessToken,
  });

  return { data, isLoading };
};

export default useGetMe;
