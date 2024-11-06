import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaCode,
  FaTimes,
  FaSpinner,
  FaCalendarAlt,
  FaInfoCircle,
} from 'react-icons/fa';
import * as S from './style';
import adminAxios from '../../libs/adminAxios';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { toast } from 'react-toastify';

interface User {
  id: string;
  username: string;
}

interface Problem {
  id: number;
  title: string;
}

interface ContestCreateRequest {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  operatorIds: string[];
  participantIds: string[];
  problemIds: number[];
}

const NewContest = () => {
  const navigate = useNavigate();
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [selectedOperators, setSelectedOperators] = useState<User[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);
  const { ref: userRef, inView: userInView } = useInView();
  const { ref: problemRef, inView: problemInView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<
    Omit<ContestCreateRequest, 'operatorIds' | 'participantIds' | 'problemIds'>
  >({
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    visibility: 'PUBLIC',
  });

  const contestMutation = useMutation({
    mutationFn: async (data: ContestCreateRequest) => {
      const response = await adminAxios.post<BaseResponse<void>>('/contests', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('대회가 성공적으로 생성되었습니다.');
      navigate('/contests');
    },
    onError: (error) => {
      toast.error('대회 생성에 실패했습니다.');
      console.error('Contest creation error:', error);
    },
  });

  const {
    data: userData,
    fetchNextPage: fetchNextUsers,
    hasNextPage: hasNextUsers,
    isFetchingNextPage: isFetchingNextUsers,
  } = useInfiniteQuery({
    queryKey: ['users', searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await adminAxios.get<BaseResponse<PageResponse<User>>>('/users', {
        params: {
          page: pageParam,
          size: 10,
          ...(searchTerm && { search: searchTerm }),
        },
      });
      return data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageable.pageNumber < lastPage.totalPages - 1
        ? lastPage.pageable.pageNumber + 1
        : undefined,
  });

  const {
    data: problemData,
    fetchNextPage: fetchNextProblems,
    hasNextPage: hasNextProblems,
    isFetchingNextPage: isFetchingNextProblems,
  } = useInfiniteQuery({
    queryKey: ['problems', searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await adminAxios.get<BaseResponse<PageResponse<Problem>>>('/problems', {
        params: {
          page: pageParam,
          size: 10,
          ...(searchTerm && { search: searchTerm }),
        },
      });
      return data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageable.pageNumber < lastPage.totalPages - 1
        ? lastPage.pageable.pageNumber + 1
        : undefined,
  });

  useEffect(() => {
    if (userInView && hasNextUsers && !isFetchingNextUsers) {
      fetchNextUsers();
    }
  }, [userInView, fetchNextUsers, hasNextUsers, isFetchingNextUsers]);

  useEffect(() => {
    if (problemInView && hasNextProblems && !isFetchingNextProblems) {
      fetchNextProblems();
    }
  }, [problemInView, fetchNextProblems, hasNextProblems, isFetchingNextProblems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVisibilityChange = (visibility: 'PUBLIC' | 'PRIVATE') => {
    setFormData((prev) => ({
      ...prev,
      visibility,
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.startAt || !formData.endAt) {
      toast.error('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (new Date(formData.endAt) <= new Date(formData.startAt)) {
      toast.error('종료 시간은 시작 시간보다 이후여야 합니다.');
      return;
    }

    if (selectedProblems.length === 0) {
      toast.error('최소 1개 이상의 문제를 선택해주세요.');
      return;
    }

    const requestData: ContestCreateRequest = {
      ...formData,
      operatorIds: selectedOperators.map((op) => op.id),
      participantIds: selectedParticipants.map((p) => p.id),
      problemIds: selectedProblems.map((p) => p.id),
    };

    contestMutation.mutate(requestData);
  };

  const toggleOperator = (user: User) => {
    setSelectedOperators((prev) =>
      prev.find((op) => op.id === user.id)
        ? prev.filter((op) => op.id !== user.id)
        : [...prev, user],
    );
  };

  const toggleParticipant = (user: User) => {
    setSelectedParticipants((prev) =>
      prev.find((p) => p.id === user.id) ? prev.filter((p) => p.id !== user.id) : [...prev, user],
    );
  };

  const toggleProblem = (problem: Problem) => {
    setSelectedProblems((prev) =>
      prev.find((p) => p.id === problem.id)
        ? prev.filter((p) => p.id !== problem.id)
        : [...prev, problem],
    );
  };

  return (
    <S.Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <S.Header>
          <S.Title>새 대회 생성</S.Title>
        </S.Header>

        <S.Form>
          <S.Section>
            <S.SectionTitle>
              <FaInfoCircle />
              기본 정보
            </S.SectionTitle>
            <S.InputGroup>
              <S.Label>대회 이름 *</S.Label>
              <S.Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="대회 이름을 입력하세요"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>대회 설명</S.Label>
              <S.Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="대회에 대한 설명을 입력하세요"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>공개 여부</S.Label>
              <S.VisibilityToggle>
                <S.VisibilityOption
                  isSelected={formData.visibility === 'PUBLIC'}
                  onClick={() => handleVisibilityChange('PUBLIC')}
                >
                  <FaEye /> 공개
                </S.VisibilityOption>
                <S.VisibilityOption
                  isSelected={formData.visibility === 'PRIVATE'}
                  onClick={() => handleVisibilityChange('PRIVATE')}
                >
                  <FaEyeSlash /> 비공개
                </S.VisibilityOption>
              </S.VisibilityToggle>
            </S.InputGroup>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FaCalendarAlt />
              일정
            </S.SectionTitle>
            <S.TimeGroup>
              <S.InputGroup>
                <S.Label>시작 시간 *</S.Label>
                <S.Input
                  type="datetime-local"
                  name="startAt"
                  value={formData.startAt}
                  onChange={handleChange}
                />
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>종료 시간 *</S.Label>
                <S.Input
                  type="datetime-local"
                  name="endAt"
                  value={formData.endAt}
                  onChange={handleChange}
                />
              </S.InputGroup>
            </S.TimeGroup>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FaUsers />
              인원 관리
            </S.SectionTitle>
            <S.ButtonGroup>
              <S.SelectButton onClick={() => setIsOperatorModalOpen(true)}>
                <FaUsers /> 운영진 선택 ({selectedOperators.length})
              </S.SelectButton>
              <S.SelectButton onClick={() => setIsParticipantModalOpen(true)}>
                <FaUsers /> 참가자 선택 ({selectedParticipants.length})
              </S.SelectButton>
            </S.ButtonGroup>

            {selectedOperators.length > 0 && (
              <S.SelectedList>
                {selectedOperators.map((op) => (
                  <S.SelectedItem key={op.id}>
                    <FaUsers />
                    {op.username}
                    <FaTimes onClick={() => toggleOperator(op)} />
                  </S.SelectedItem>
                ))}
              </S.SelectedList>
            )}

            {selectedParticipants.length > 0 && (
              <S.SelectedList>
                {selectedParticipants.map((p) => (
                  <S.SelectedItem key={p.id}>
                    <FaUsers />
                    {p.username}
                    <FaTimes onClick={() => toggleParticipant(p)} />
                  </S.SelectedItem>
                ))}
              </S.SelectedList>
            )}
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FaCode />
              문제 관리
            </S.SectionTitle>
            <S.ButtonGroup>
              <S.SelectButton onClick={() => setIsProblemModalOpen(true)}>
                <FaCode /> 문제 선택 ({selectedProblems.length})
              </S.SelectButton>
            </S.ButtonGroup>

            {selectedProblems.length > 0 && (
              <S.SelectedList>
                {selectedProblems.map((problem) => (
                  <S.SelectedItem key={problem.id}>
                    <FaCode />
                    {problem.title}
                    <FaTimes onClick={() => toggleProblem(problem)} />
                  </S.SelectedItem>
                ))}
              </S.SelectedList>
            )}
          </S.Section>

          <S.SubmitButton onClick={handleSubmit} disabled={contestMutation.isPending}>
            {contestMutation.isPending ? (
              <S.LoadingSpinner>
                <FaSpinner />
                생성 중...
              </S.LoadingSpinner>
            ) : (
              '대회 생성'
            )}
          </S.SubmitButton>
        </S.Form>
      </motion.div>

      <AnimatePresence>
        {isOperatorModalOpen && (
          <S.Modal
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <S.ModalContent>
              <S.ModalHeader>
                <h3>운영진 선택</h3>
                <S.CloseButton onClick={() => setIsOperatorModalOpen(false)}>
                  <FaTimes />
                </S.CloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <S.SearchInput
                  type="text"
                  placeholder="사용자 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {userData?.pages.map((page) =>
                  page.content.map((user) => (
                    <S.UserItem
                      key={user.id}
                      isSelected={!!selectedOperators.find((op) => op.id === user.id)}
                      onClick={() => toggleOperator(user)}
                    >
                      <FaUsers />
                      {user.username}
                    </S.UserItem>
                  )),
                )}
                <div ref={userRef}>
                  {isFetchingNextUsers && (
                    <S.LoadingSpinner>
                      <FaSpinner />
                    </S.LoadingSpinner>
                  )}
                </div>
              </S.ModalBody>
            </S.ModalContent>
          </S.Modal>
        )}

        {isParticipantModalOpen && (
          <S.Modal
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <S.ModalContent>
              <S.ModalHeader>
                <h3>참가자 선택</h3>
                <S.CloseButton onClick={() => setIsParticipantModalOpen(false)}>
                  <FaTimes />
                </S.CloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <S.SearchInput
                  type="text"
                  placeholder="사용자 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {userData?.pages.map((page) =>
                  page.content.map((user) => (
                    <S.UserItem
                      key={user.id}
                      isSelected={!!selectedParticipants.find((p) => p.id === user.id)}
                      onClick={() => toggleParticipant(user)}
                    >
                      <FaUsers />
                      {user.username}
                    </S.UserItem>
                  )),
                )}
                <div ref={userRef}>
                  {isFetchingNextUsers && (
                    <S.LoadingSpinner>
                      <FaSpinner />
                    </S.LoadingSpinner>
                  )}
                </div>
              </S.ModalBody>
            </S.ModalContent>
          </S.Modal>
        )}

        {isProblemModalOpen && (
          <S.Modal
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <S.ModalContent>
              <S.ModalHeader>
                <h3>문제 선택</h3>
                <S.CloseButton onClick={() => setIsProblemModalOpen(false)}>
                  <FaTimes />
                </S.CloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <S.SearchInput
                  type="text"
                  placeholder="문제 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {problemData?.pages.map((page) =>
                  page.content.map((problem) => (
                    <S.ProblemItem
                      key={problem.id}
                      isSelected={!!selectedProblems.find((p) => p.id === problem.id)}
                      onClick={() => toggleProblem(problem)}
                    >
                      <FaCode />
                      {problem.title}
                    </S.ProblemItem>
                  )),
                )}
                <div ref={problemRef}>
                  {isFetchingNextProblems && (
                    <S.LoadingSpinner>
                      <FaSpinner />
                    </S.LoadingSpinner>
                  )}
                </div>
              </S.ModalBody>
            </S.ModalContent>
          </S.Modal>
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default NewContest;
