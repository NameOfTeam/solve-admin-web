import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaUser, FaUsers, FaClock, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';
import * as S from './style';
import adminAxios from '../../libs/adminAxios';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';

interface ContestResponse {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  owner: {
    id: string;
    username: string;
  };
  participants: Array<{
    id: string;
    username: string;
  }>;
  operators: Array<{
    id: string;
    username: string;
  }>;
  problems: Array<{
    title: string;
  }>;
  visibility: 'PUBLIC' | 'PRIVATE';
  createdAt: string;
  updatedAt: string;
}

const ContestList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { ref, inView } = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetching } =
    useInfiniteQuery({
      queryKey: ['contests', debouncedSearch],
      queryFn: async ({ pageParam = 0 }) => {
        const params: {
          page: number;
          size: number;
          search?: string;
        } = {
          page: pageParam,
          size: 12,
        };

        if (debouncedSearch) {
          params.search = debouncedSearch;
        }

        const { data } = await adminAxios.get<BaseResponse<PageResponse<ContestResponse>>>(
          '/contests',
          { params },
        );
        return data.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.pageable.pageNumber < lastPage.totalPages - 1
          ? lastPage.pageable.pageNumber + 1
          : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getContestStatus = (startAt: string, endAt: string) => {
    const now = new Date();
    const start = new Date(startAt);
    const end = new Date(endAt);

    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'ongoing';
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          대회 <span>관리</span>
        </S.Title>
        <S.CreateButton onClick={() => navigate('/contests/new')}>
          <FaPlus /> 새 대회 생성
        </S.CreateButton>
      </S.Header>

      <S.SearchBar>
        <S.SearchInputWrapper>
          <S.SearchInput
            type="text"
            placeholder="대회 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isFetching && searchTerm === debouncedSearch && (
            <S.SearchSpinner>
              <FaSpinner />
            </S.SearchSpinner>
          )}
        </S.SearchInputWrapper>
      </S.SearchBar>

      {status === 'pending' ? (
        <S.LoadingSpinner>
          <FaSpinner />
          <span>대회 목록을 불러오는 중...</span>
        </S.LoadingSpinner>
      ) : status === 'error' ? (
        <S.ErrorMessage>
          <strong>오류가 발생했습니다</strong>
          대회 목록을 불러오는데 실패했습니다.
        </S.ErrorMessage>
      ) : (
        <S.ContestGrid>
          {data.pages.map((page) =>
            page.content.map((contest) => (
              <S.ContestCard
                key={contest.id}
                onClick={() => navigate(`/contests/${contest.id}`)}
                status={getContestStatus(contest.startAt, contest.endAt)}
              >
                <S.ContestHeader>
                  <S.ContestTitle>{contest.title}</S.ContestTitle>
                  <S.VisibilityBadge visibility={contest.visibility}>
                    {contest.visibility === 'PUBLIC' ? (
                      <>
                        <FaEye /> 공개
                      </>
                    ) : (
                      <>
                        <FaEyeSlash /> 비공개
                      </>
                    )}
                  </S.VisibilityBadge>
                </S.ContestHeader>

                <S.ContestDescription>{contest.description}</S.ContestDescription>

                <S.ContestInfo>
                  <S.InfoItem>
                    <FaClock />
                    <div>
                      <div>시작: {formatDate(contest.startAt)}</div>
                      <div>종료: {formatDate(contest.endAt)}</div>
                    </div>
                  </S.InfoItem>

                  <S.InfoItem>
                    <FaUsers />
                    <span>참가자 {contest.participants.length}명</span>
                  </S.InfoItem>

                  <S.InfoItem>
                    <FaUser />
                    <span>주최자: {contest.owner.username}</span>
                  </S.InfoItem>
                </S.ContestInfo>

                <S.ContestMeta>
                  <S.ProblemCount>문제 {contest.problems.length}개</S.ProblemCount>
                  <S.OperatorCount>운영진 {contest.operators.length}명</S.OperatorCount>
                </S.ContestMeta>
              </S.ContestCard>
            )),
          )}
        </S.ContestGrid>
      )}

      <div ref={ref}>
        {isFetchingNextPage && (
          <S.LoadingSpinner>
            <FaSpinner />
            <span>추가 대회를 불러오는 중...</span>
          </S.LoadingSpinner>
        )}
      </div>
    </S.Container>
  );
};

export default ContestList;
