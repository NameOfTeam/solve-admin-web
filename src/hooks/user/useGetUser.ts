import { useQuery } from '@tanstack/react-query';
import customAxios from '../../libs/customAxios';
import { BaseResponse } from '../../types/common/base';
import { UserResponse } from '../../types/user/user';

const useGetUser = (userId: string) => {
  const getUser = async () => {
    const { data } = await customAxios.get<BaseResponse<UserResponse>>(`/users/${userId}`);

    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: getUser,
  });

  return { data, isLoading };
};

export default useGetUser;
