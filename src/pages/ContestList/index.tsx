import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSpinner,
  FaUser,
  FaUsers,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaSearch,
} from 'react-icons/fa';
import * as S from './style';
import adminAxios from '../../libs/adminAxios';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { ContestResponse } from '../../types/contest/contest';

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
        const params = {
          page: pageParam,
          size: 12,
          ...(debouncedSearch && { search: debouncedSearch }),
        };
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <S.Container>
        <S.Header>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <S.Title>
              대회 <span>관리</span>
            </S.Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <S.CreateButton
              onClick={() => navigate('/contests/new')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <FaPlus /> 새 대회 생성
            </S.CreateButton>
          </motion.div>
        </S.Header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <S.SearchBar>
            <S.SearchInputWrapper>
              <FaSearch className="search-icon" />
              <S.SearchInput
                type="text"
                placeholder="대회 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AnimatePresence>
                {isFetching && searchTerm === debouncedSearch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}>
                    <S.SearchSpinner>
                      <FaSpinner />
                    </S.SearchSpinner>
                  </motion.div>
                )}
              </AnimatePresence>
            </S.SearchInputWrapper>
          </S.SearchBar>
        </motion.div>

        {status === 'pending' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <S.LoadingSpinner>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <FaSpinner />
              </motion.div>
              <span>대회 목록을 불러오는 중...</span>
            </S.LoadingSpinner>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <S.ErrorMessage>
              <strong>오류가 발생했습니다</strong>
              대회 목록을 불러오는데 실패했습니다.
            </S.ErrorMessage>
          </motion.div>
        ) : (
          <S.ContestGrid>
            <AnimatePresence>
              {data.pages.map((page) =>
                page.content.map((contest) => (
                  <motion.div
                    key={contest.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -8 }}>
                    <S.ContestCard
                      onClick={() => navigate(`/contests/${contest.id}`)}
                      status={getContestStatus(contest.startAt, contest.endAt)}>
                      <S.ContestHeader>
                        <S.ContestTitle>{contest.title}</S.ContestTitle>
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <S.VisibilityBadge visibility={contest.visibility}>
                            {contest.visibility === 'PUBLIC' ? (
                              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }}>
                                <FaEye /> 공개
                              </motion.div>
                            ) : (
                              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }}>
                                <FaEyeSlash /> 비공개
                              </motion.div>
                            )}
                          </S.VisibilityBadge>
                        </motion.div>
                      </S.ContestHeader>

                      <S.ContestDescription>{contest.description}</S.ContestDescription>

                      <S.ContestInfo>
                        <motion.div whileHover={{ x: 5 }}>
                          <S.InfoItem>
                            <FaClock />
                            <div>
                              <div>시작: {formatDate(contest.startAt)}</div>
                              <div>종료: {formatDate(contest.endAt)}</div>
                            </div>
                          </S.InfoItem>
                        </motion.div>

                        <motion.div whileHover={{ x: 5 }}>
                          <S.InfoItem>
                            <FaUsers />
                            <span>참가자 {contest.participants.length}명</span>
                          </S.InfoItem>
                        </motion.div>

                        <motion.div whileHover={{ x: 5 }}>
                          <S.InfoItem>
                            <FaUser />
                            <span>주최자: {contest.owner.username}</span>
                          </S.InfoItem>
                        </motion.div>
                      </S.ContestInfo>

                      <S.ContestMeta>
                        <S.ProblemCount>문제 {contest.problems.length}개</S.ProblemCount>
                        <S.OperatorCount>운영진 {contest.operators.length}명</S.OperatorCount>
                      </S.ContestMeta>
                    </S.ContestCard>
                  </motion.div>
                )),
              )}
            </AnimatePresence>
          </S.ContestGrid>
        )}

        <div ref={ref}>
          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}>
              <S.LoadingSpinner>
                <FaSpinner />
                <span>추가 대회를 불러오는 중...</span>
              </S.LoadingSpinner>
            </motion.div>
          )}
        </div>
      </S.Container>
    </motion.div>
  );
};

export default ContestList;
