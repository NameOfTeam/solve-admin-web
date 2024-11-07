import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import { FaClock, FaLightbulb, FaMemory, FaPlus, FaSpinner, FaUser } from 'react-icons/fa';
import * as S from './style';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { ProblemResponse } from '../../types/problem/problem';
import adminAxios from '../../libs/adminAxios';

const Problems = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['problems'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await adminAxios.get<BaseResponse<PageResponse<ProblemResponse>>>(
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  if (status === 'pending') {
    return (
      <S.Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.LoadingContainer>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <FaSpinner size={40} />
            </motion.div>
            <S.LoadingText>문제 목록을 불러오는 중입니다...</S.LoadingText>
          </S.LoadingContainer>
        </motion.div>
      </S.Container>
    );
  }

  if (status === 'error') {
    return (
      <S.Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <S.ErrorMessage>
            <FaLightbulb size={24} />
            문제 목록을 불러오는데 실패했습니다.
          </S.ErrorMessage>
        </motion.div>
      </S.Container>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <S.Container>
        <S.Header>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <S.Title>
              문제 <span>관리</span>
            </S.Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <S.CreateButton to="/problems/new">
              <FaPlus /> 새 문제 생성
            </S.CreateButton>
          </motion.div>
        </S.Header>

        <S.ProblemGrid>
          <AnimatePresence>
            {data.pages.map((page) =>
              page.content.map((problem) => (
                <motion.div
                  key={problem.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                >
                  <S.ProblemCard to={`/problems/${problem.id}`}>
                    <S.ProblemTitle>{problem.title}</S.ProblemTitle>
                    <S.ProblemContent>{problem.content}</S.ProblemContent>

                    <S.ProblemMetaData>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <S.MetaItem>
                          <FaUser />
                          {problem.author.username}
                        </S.MetaItem>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <S.MetaItem>
                          <FaClock />
                          {problem.timeLimit.toFixed(1)}초
                        </S.MetaItem>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <S.MetaItem>
                          <FaMemory />
                          {problem.memoryLimit}MB
                        </S.MetaItem>
                      </motion.div>
                    </S.ProblemMetaData>
                  </S.ProblemCard>
                </motion.div>
              )),
            )}
          </AnimatePresence>
        </S.ProblemGrid>

        <div ref={ref}>
          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <S.LoadingSpinner>
                <FaSpinner /> 추가 문제를 불러오는 중...
              </S.LoadingSpinner>
            </motion.div>
          )}
        </div>
      </S.Container>
    </motion.div>
  );
};

export default Problems;
