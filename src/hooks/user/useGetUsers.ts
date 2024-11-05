import { useInfiniteQuery } from '@tanstack/react-query';
import customAxios from '../../libs/customAxios';
import { UserResponse } from '../../types/user/user';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const useGetUsers = () => {
  const getUsers = async ({ pageParam = 0 }: { pageParam: number }) => {
    const { data } = await customAxios.get<BaseResponse<PageResponse<UserResponse>>>('/users', {
      params: {
        page: pageParam,
        size: 10,
      },
    });

    return data.data;
  };

  const { ref, inView } = useInView();
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageable.pageNumber < lastPage.totalPages - 1
        ? lastPage.pageable.pageNumber + 1
        : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return { data, ref, fetchNextPage };
};

export default useGetUsers;
