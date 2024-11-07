import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';
import * as S from './style';
import DraggableProblem from '../../components/DraggableProblem';
import ProblemPreview from '../../components/ProblemPreview';
import adminAxios from '../../libs/adminAxios';
import { toast } from 'react-toastify';
import { ProblemResponse } from '../../types/problem/problem';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';

const NewWorkbook = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView();

  const [showProblemModal, setShowProblemModal] = useState(false);
  const [previewProblem, setPreviewProblem] = useState<ProblemResponse | null>(null);

  const [request, setRequest] = useState({
    title: '',
    problemIds: [] as number[],
  });

  const [selectedProblems, setSelectedProblems] = useState<ProblemResponse[]>([]);

  // 문제 목록 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['problems', debouncedSearch],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await adminAxios.get<BaseResponse<PageResponse<ProblemResponse>>>(
        '/problems',
        {
          params: {
            page: pageParam,
            size: 10,
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

  // 문제집 생성
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await adminAxios.post('/workbooks', {
        ...request,
        problemIds: selectedProblems.map((p) => p.id),
      });
      return data;
    },
    onSuccess: () => {
      toast.success('문제집이 생성되었습니다.');
      navigate('/workbooks');
    },
    onError: () => {
      toast.error('문제집 생성에 실패했습니다.');
    },
  });

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSubmit = () => {
    if (!request.title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (selectedProblems.length === 0) {
      toast.error('최소 1개 이상의 문제를 선택해주세요.');
      return;
    }

    mutation.mutate();
  };

  const toggleProblem = (problem: ProblemResponse) => {
    setSelectedProblems((prev) => {
      const exists = prev.find((p) => p.id === problem.id);
      if (exists) {
        return prev.filter((p) => p.id !== problem.id);
      }
      return [...prev, problem];
    });
  };

  const handleMove = (problem: ProblemResponse, direction: 1 | -1) => {
    const oldIndex = selectedProblems.findIndex((p) => p.id === problem.id);
    const newIndex = oldIndex + direction;

    if (newIndex < 0 || newIndex >= selectedProblems.length) return;

    const newProblems = [...selectedProblems];
    [newProblems[oldIndex], newProblems[newIndex]] = [newProblems[newIndex], newProblems[oldIndex]];

    setSelectedProblems(newProblems);
  };

  return (
    <S.Container>
      <S.Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <S.Header>
          <S.TitleWrapper>
            <S.Title>
              문제집 <span>생성</span>
            </S.Title>
          </S.TitleWrapper>
        </S.Header>

        <S.Form>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.InputGroup>
              <S.Label>문제집 제목 *</S.Label>
              <S.Input
                value={request.title}
                onChange={(e) => setRequest((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="문제집 제목을 입력하세요"
              />
            </S.InputGroup>
          </S.Section>

          <S.Section>
            <S.SectionTitle>문제 관리</S.SectionTitle>
            <S.ButtonGroup>
              <S.SelectButton onClick={() => setShowProblemModal(true)}>
                <S.AddIcon />
                문제 선택 ({selectedProblems.length})
              </S.SelectButton>
            </S.ButtonGroup>

            {selectedProblems.length > 0 && (
              <S.ProblemList layout>
                {selectedProblems.map((problem) => (
                  <DraggableProblem
                    key={problem.id}
                    problem={problem}
                    onRemove={toggleProblem}
                    onPreview={() => setPreviewProblem(problem)}
                    onMove={handleMove}
                  />
                ))}
              </S.ProblemList>
            )}
          </S.Section>

          <S.SubmitButton onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <S.SpinnerIcon /> 생성 중...
              </>
            ) : (
              '문제집 생성'
            )}
          </S.SubmitButton>
        </S.Form>
      </S.Content>

      <AnimatePresence>
        {showProblemModal && (
          <S.Modal
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <S.ModalContent>
              <S.ModalHeader>
                <S.ModalTitle>문제 선택</S.ModalTitle>
                <S.CloseButton onClick={() => setShowProblemModal(false)}>
                  <S.CloseIcon />
                </S.CloseButton>
              </S.ModalHeader>

              <S.ModalBody>
                <S.SearchInput
                  type="text"
                  placeholder="문제 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <S.ProblemGrid>
                  {isLoading ? (
                    <S.LoadingWrapper>
                      <S.SpinnerIcon /> 문제를 불러오는 중...
                    </S.LoadingWrapper>
                  ) : (
                    data?.pages.map((page) =>
                      page.content.map((problem) => (
                        <S.ProblemItem
                          key={problem.id}
                          isSelected={!!selectedProblems.find((p) => p.id === problem.id)}
                          onClick={() => toggleProblem(problem)}
                        >
                          <S.ProblemInfo>
                            <S.ProblemTitle>{problem.title}</S.ProblemTitle>
                            <S.ProblemMetaInfo>
                              <span>{problem.timeLimit}초</span>
                              <span>{problem.memoryLimit}MB</span>
                            </S.ProblemMetaInfo>
                          </S.ProblemInfo>
                          <S.PreviewButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewProblem(problem);
                            }}
                          >
                            <S.PreviewIcon />
                          </S.PreviewButton>
                        </S.ProblemItem>
                      )),
                    )
                  )}
                  <div ref={ref}>
                    {isFetchingNextPage && (
                      <S.LoadingWrapper>
                        <S.SpinnerIcon /> 추가 문제를 불러오는 중...
                      </S.LoadingWrapper>
                    )}
                  </div>
                </S.ProblemGrid>
              </S.ModalBody>
            </S.ModalContent>
          </S.Modal>
        )}

        {previewProblem && (
          <ProblemPreview problem={previewProblem} onClose={() => setPreviewProblem(null)} />
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default NewWorkbook;
