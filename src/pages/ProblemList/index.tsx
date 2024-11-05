import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { FaUser, FaClock, FaMemory, FaSpinner, FaPlus } from 'react-icons/fa';
import customAxios from '../../libs/customAxios';
import * as S from './style';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { ProblemResponse } from '../../types/problem/problem';

const ProblemList = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['problems'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await customAxios.get<BaseResponse<PageResponse<ProblemResponse>>>(
        '/problems',
        {
          params: {
            page: pageParam,
            size: 12,
          },
        },
      );

      return data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageable.pageNumber < lastPage.totalPages - 1
        ? lastPage.pageable.pageNumber + 1
        : undefined,
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'pending') {
    return (
      <S.Container>
        <S.LoadingSpinner>
          <FaSpinner /> 문제 목록을 불러오는 중입니다...
        </S.LoadingSpinner>
      </S.Container>
    );
  }

  if (status === 'error') {
    return (
      <S.Container>
        <S.ErrorMessage>문제 목록을 불러오는데 실패했습니다.</S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          문제 <span>관리</span>
        </S.Title>
        <S.CreateButton to="/problems/new">
          <FaPlus /> 새 문제 생성
        </S.CreateButton>
      </S.Header>

      <S.ProblemGrid>
        {data.pages.map((page) =>
          page.content.map((problem) => (
            <S.ProblemCard key={problem.id} to={`/problems/${problem.id}`}>
              <S.ProblemTitle>{problem.title}</S.ProblemTitle>
              <S.ProblemContent>{problem.content}</S.ProblemContent>

              <S.ProblemMetaData>
                <S.MetaItem>
                  <FaUser />
                  {problem.author.username}
                </S.MetaItem>
                <S.MetaItem>
                  <FaClock />
                  {problem.timeLimit.toFixed(1)}초
                </S.MetaItem>
                <S.MetaItem>
                  <FaMemory />
                  {problem.memoryLimit}MB
                </S.MetaItem>
              </S.ProblemMetaData>
            </S.ProblemCard>
          )),
        )}
      </S.ProblemGrid>

      <div ref={ref}>
        {isFetchingNextPage && (
          <S.LoadingSpinner>
            <FaSpinner /> 추가 문제를 불러오는 중...
          </S.LoadingSpinner>
        )}
      </div>
    </S.Container>
  );
};

export default ProblemList;
