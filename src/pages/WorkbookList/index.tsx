import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import * as S from './style';
import { containerVariants, itemVariants } from './constants';
import adminAxios from '../../libs/adminAxios';
import { useDebounce } from '../../hooks/useDebounce';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { WorkbookResponse } from '../../types/workbook';

const WorkbookList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['workbooks', debouncedSearch],
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await adminAxios.get<BaseResponse<PageResponse<WorkbookResponse>>>(
          '/workbooks',
          {
            params: {
              page: pageParam,
              size: 12,
              search: debouncedSearch || undefined,
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingSpinner>
          <S.SpinnerIcon /> 문제집 목록을 불러오는 중...
        </S.LoadingSpinner>
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.ErrorMessage>
          <strong>오류가 발생했습니다</strong>
          문제집 목록을 불러오는데 실패했습니다.
        </S.ErrorMessage>
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
            transition={{ duration: 0.6 }}
          >
            <S.Title>
              문제집 <span>관리</span>
            </S.Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <S.CreateButton
              onClick={() => navigate('/workbooks/new')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <S.PlusIcon /> 새 문제집 만들기
            </S.CreateButton>
          </motion.div>
        </S.Header>

        <S.SearchBar>
          <S.SearchInputWrapper>
            <S.SearchIcon />
            <S.SearchInput
              type="text"
              placeholder="문제집 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <S.ClearButton onClick={() => setSearchTerm('')}>
                <S.CloseIcon />
              </S.ClearButton>
            )}
          </S.SearchInputWrapper>
        </S.SearchBar>

        <S.WorkbookGrid>
          <AnimatePresence>
            {data?.pages.map((page) =>
              page.content.map((workbook) => (
                <motion.div key={workbook.id} variants={itemVariants} layout whileHover={{ y: -8 }}>
                  <S.WorkbookCard onClick={() => navigate(`/workbooks/${workbook.id}`)}>
                    <S.WorkbookHeader>
                      <S.WorkbookTitle>{workbook.title}</S.WorkbookTitle>
                      <S.ProblemCount>문제 {workbook.problems.length}개</S.ProblemCount>
                    </S.WorkbookHeader>

                    <S.WorkbookInfo>
                      <S.InfoItem>
                        <S.UserIcon />
                        <span>{workbook.author.username}</span>
                      </S.InfoItem>
                      <S.InfoItem>
                        <S.TimeIcon />
                        <span>{new Date(workbook.createdAt).toLocaleDateString()}</span>
                      </S.InfoItem>
                    </S.WorkbookInfo>
                  </S.WorkbookCard>
                </motion.div>
              )),
            )}
          </AnimatePresence>
        </S.WorkbookGrid>

        <div ref={ref}>
          {isFetchingNextPage && (
            <S.LoadingSpinner>
              <S.SpinnerIcon />
              <span>추가 문제집을 불러오는 중...</span>
            </S.LoadingSpinner>
          )}
        </div>
      </S.Container>
    </motion.div>
  );
};

export default WorkbookList;
