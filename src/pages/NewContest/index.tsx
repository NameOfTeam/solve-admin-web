import { useEffect, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  FaCalendarAlt,
  FaCode,
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
  FaSpinner,
  FaTimes,
  FaUsers,
} from 'react-icons/fa';
import * as S from './style';
import adminAxios from '../../libs/adminAxios';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { toast } from 'react-toastify';
import {
  ContestCreateRequest,
  FormState,
  ModalState,
  Problem,
  SelectedItemsState,
  SelectionModalProps,
  User,
} from './types';

// 메모이즈된 헤더 컴포넌트
const Header = memo(() => (
  <S.Header>
    <S.Title>새 대회 생성</S.Title>
    <S.SubTitle>대회 정보를 입력하여 새로운 대회를 생성하세요</S.SubTitle>
  </S.Header>
));

Header.displayName = 'Header';

interface BasicInfoSectionProps {
  formData: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleVisibilityChange: (visibility: 'PUBLIC' | 'PRIVATE') => void;
}

// 메모이즈된 기본 정보 섹션
const BasicInfoSection = memo(
  ({ formData, handleChange, handleVisibilityChange }: BasicInfoSectionProps) => (
    <S.Section>
      <S.SectionTitle>
        <FaInfoCircle />
        기본 정보
      </S.SectionTitle>
      <S.InputGroup>
        <S.Label>
          대회 이름 <S.RequiredMark>*</S.RequiredMark>
        </S.Label>
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
            onClick={() => handleVisibilityChange('PUBLIC')}>
            <FaEye /> 공개
          </S.VisibilityOption>
          <S.VisibilityOption
            isSelected={formData.visibility === 'PRIVATE'}
            onClick={() => handleVisibilityChange('PRIVATE')}>
            <FaEyeSlash /> 비공개
          </S.VisibilityOption>
        </S.VisibilityToggle>
      </S.InputGroup>
    </S.Section>
  ),
);

BasicInfoSection.displayName = 'BasicInfoSection';

// 메모이즈된 선택 모달 컴포넌트
const SelectionModal = memo(
  ({
    isOpen,
    onClose,
    title,
    searchTerm,
    onSearchChange,
    children,
    loadingRef,
    isLoading,
  }: SelectionModalProps) => {
    if (!isOpen) return null;

    return (
      <S.Modal
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}>
        <S.ModalContent>
          <S.ModalHeader>
            <h3>{title}</h3>
            <S.CloseButton onClick={onClose} type="button">
              <FaTimes />
            </S.CloseButton>
          </S.ModalHeader>
          <S.ModalBody>
            <S.SearchInput
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {children}
            <div ref={loadingRef}>
              {isLoading && (
                <S.LoadingSpinner>
                  <FaSpinner />
                  검색 중...
                </S.LoadingSpinner>
              )}
            </div>
          </S.ModalBody>
        </S.ModalContent>
      </S.Modal>
    );
  },
);

SelectionModal.displayName = 'SelectionModal';

// 메인 NewContest 컴포넌트
const NewContest = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<ModalState>({
    operator: false,
    participant: false,
    problem: false,
  });

  const [selectedItems, setSelectedItems] = useState<SelectedItemsState>({
    operators: [],
    participants: [],
    problems: [],
  });

  const { ref: userRef, inView: userInView } = useInView();
  const { ref: problemRef, inView: problemInView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [formData, setFormData] = useState<FormState>({
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    visibility: 'PUBLIC',
  });

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // API 쿼리
  const useInfiniteItems = <T extends User | Problem>(endpoint: string) => {
    return useInfiniteQuery({
      queryKey: [endpoint, debouncedSearch] as const,
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await adminAxios.get<BaseResponse<PageResponse<T>>>(`/${endpoint}`, {
          params: {
            page: pageParam,
            size: 10,
            ...(debouncedSearch && { search: debouncedSearch }),
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
  };

  const {
    data: userData,
    fetchNextPage: fetchNextUsers,
    hasNextPage: hasNextUsers,
    isFetchingNextPage: isFetchingNextUsers,
  } = useInfiniteItems<User>('users');

  const {
    data: problemData,
    fetchNextPage: fetchNextProblems,
    hasNextPage: hasNextProblems,
    isFetchingNextPage: isFetchingNextProblems,
  } = useInfiniteItems<Problem>('problems');

  useEffect(() => {
    if (userInView && hasNextUsers) fetchNextUsers();
  }, [userInView, hasNextUsers, fetchNextUsers]);

  useEffect(() => {
    if (problemInView && hasNextProblems) fetchNextProblems();
  }, [problemInView, hasNextProblems, fetchNextProblems]);

  // Mutations
  const contestMutation = useMutation({
    mutationFn: async (data: ContestCreateRequest) => {
      const response = await adminAxios.post<BaseResponse<void>>('/contests', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('대회가 성공적으로 생성되었습니다.');
      navigate('/contests');
    },
    onError: () => {
      toast.error('대회 생성에 실패했습니다.');
    },
  });

  // Event Handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleVisibilityChange = useCallback((visibility: 'PUBLIC' | 'PRIVATE') => {
    setFormData((prev) => ({ ...prev, visibility }));
  }, []);

  const toggleItem = useCallback(
    <T extends { id: string | number }>(type: keyof SelectedItemsState, item: T) => {
      setSelectedItems((prev) => ({
        ...prev,
        [type]: prev[type].find((i) => i.id === item.id)
          ? prev[type].filter((i) => i.id !== item.id)
          : [...prev[type], item],
      }));
    },
    [],
  );

  const handleModalToggle = useCallback((modalType: keyof ModalState) => {
    setModalState((prev) => ({
      ...prev,
      [modalType]: !prev[modalType],
    }));
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.title || !formData.startAt || !formData.endAt) {
      toast.error('필수 항목을 모두 입력해주세요.');
      return false;
    }

    if (new Date(formData.endAt) <= new Date(formData.startAt)) {
      toast.error('종료 시간은 시작 시간보다 이후여야 합니다.');
      return false;
    }

    if (selectedItems.problems.length === 0) {
      toast.error('최소 1개 이상의 문제를 선택해주세요.');
      return false;
    }

    return true;
  }, [formData, selectedItems.problems]);

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const requestData: ContestCreateRequest = {
      ...formData,
      operatorIds: selectedItems.operators.map((op) => op.id),
      participantIds: selectedItems.participants.map((p) => p.id),
      problemIds: selectedItems.problems.map((p) => p.id),
    };

    contestMutation.mutate(requestData);
  }, [formData, selectedItems, contestMutation, validateForm]);

  return (
    <S.PageContainer>
      <S.Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Header />

          <S.Form>
            <BasicInfoSection
              formData={formData}
              handleChange={handleChange}
              handleVisibilityChange={handleVisibilityChange}
            />

            {/* 일정 섹션 */}
            <S.Section>
              <S.SectionTitle>
                <FaCalendarAlt />
                일정
              </S.SectionTitle>
              <S.TimeGroup>
                <S.InputGroup>
                  <S.Label>
                    시작 시간 <S.RequiredMark>*</S.RequiredMark>
                  </S.Label>
                  <S.DateTimeInput
                    type="datetime-local"
                    name="startAt"
                    value={formData.startAt}
                    onChange={handleChange}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <S.Label>
                    종료 시간 <S.RequiredMark>*</S.RequiredMark>
                  </S.Label>
                  <S.DateTimeInput
                    type="datetime-local"
                    name="endAt"
                    value={formData.endAt}
                    onChange={handleChange}
                  />
                </S.InputGroup>
              </S.TimeGroup>
            </S.Section>

            {/* 인원 관리 섹션 */}
            <S.Section>
              <S.SectionTitle>
                <FaUsers />
                인원 관리
              </S.SectionTitle>
              <S.SectionDescription>
                대회 운영진과 참가자를 선택하여 관리할 수 있습니다.
              </S.SectionDescription>
              <S.ButtonGroup>
                <S.SelectButton onClick={() => handleModalToggle('operator')} type="button">
                  <FaUsers /> 운영진 선택 ({selectedItems.operators.length})
                </S.SelectButton>
                <S.SelectButton onClick={() => handleModalToggle('participant')} type="button">
                  <FaUsers /> 참가자 선택 ({selectedItems.participants.length})
                </S.SelectButton>
              </S.ButtonGroup>

              {selectedItems.operators.length > 0 && (
                <>
                  <S.Badge variant="info">운영진 목록</S.Badge>
                  <S.SelectedList>
                    {selectedItems.operators.map((op) => (
                      <S.SelectedItem key={op.id}>
                        <FaUsers />
                        {op.username}
                        <FaTimes onClick={() => toggleItem('operators', op)} />
                      </S.SelectedItem>
                    ))}
                  </S.SelectedList>
                </>
              )}

              {selectedItems.participants.length > 0 && (
                <>
                  <S.Badge variant="info">참가자 목록</S.Badge>
                  <S.SelectedList>
                    {selectedItems.participants.map((p) => (
                      <S.SelectedItem key={p.id}>
                        <FaUsers />
                        {p.username}
                        <FaTimes onClick={() => toggleItem('participants', p)} />
                      </S.SelectedItem>
                    ))}
                  </S.SelectedList>
                </>
              )}
            </S.Section>

            {/* 문제 관리 섹션 */}
            <S.Section>
              <S.SectionTitle>
                <FaCode />
                문제 관리
              </S.SectionTitle>
              <S.SectionDescription>
                대회에 포함될 문제를 선택해주세요. <S.RequiredMark>*</S.RequiredMark>
              </S.SectionDescription>
              <S.ButtonGroup>
                <S.SelectButton onClick={() => handleModalToggle('problem')} type="button">
                  <FaCode /> 문제 선택 ({selectedItems.problems.length})
                </S.SelectButton>
              </S.ButtonGroup>

              {selectedItems.problems.length > 0 ? (
                <>
                  <S.Badge variant="success">선택된 문제</S.Badge>
                  <S.SelectedList>
                    {selectedItems.problems.map((problem) => (
                      <S.SelectedItem key={problem.id}>
                        <FaCode />
                        {problem.title}
                        <FaTimes onClick={() => toggleItem('problems', problem)} />
                      </S.SelectedItem>
                    ))}
                  </S.SelectedList>
                </>
              ) : (
                <S.EmptyState>
                  <FaCode />
                  <h4>선택된 문제가 없습니다</h4>
                  <p>위 버튼을 클릭하여 문제를 선택해주세요.</p>
                </S.EmptyState>
              )}
            </S.Section>

            <S.SubmitButton
              onClick={handleSubmit}
              disabled={contestMutation.isPending}
              type="button">
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
          {/* 운영진 선택 모달 */}
          {modalState.operator && (
            <SelectionModal
              isOpen={modalState.operator}
              onClose={() => handleModalToggle('operator')}
              title="운영진 선택"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              loadingRef={userRef}
              isLoading={isFetchingNextUsers}>
              {userData?.pages.map((page) =>
                page.content.map((user) => (
                  <S.UserItem
                    key={user.id}
                    isSelected={!!selectedItems.operators.find((op) => op.id === user.id)}
                    onClick={() => toggleItem('operators', user)}>
                    <FaUsers />
                    {user.username}
                  </S.UserItem>
                )),
              )}
            </SelectionModal>
          )}

          {/* 참가자 선택 모달 */}
          {modalState.participant && (
            <SelectionModal
              isOpen={modalState.participant}
              onClose={() => handleModalToggle('participant')}
              title="참가자 선택"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              loadingRef={userRef}
              isLoading={isFetchingNextUsers}>
              {userData?.pages.map((page) =>
                page.content.map((user) => (
                  <S.UserItem
                    key={user.id}
                    isSelected={!!selectedItems.participants.find((p) => p.id === user.id)}
                    onClick={() => toggleItem('participants', user)}>
                    <FaUsers />
                    {user.username}
                  </S.UserItem>
                )),
              )}
            </SelectionModal>
          )}

          {/* 문제 선택 모달 */}
          {modalState.problem && (
            <SelectionModal
              isOpen={modalState.problem}
              onClose={() => handleModalToggle('problem')}
              title="문제 선택"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              loadingRef={problemRef}
              isLoading={isFetchingNextProblems}>
              {problemData?.pages.map((page) =>
                page.content.map((problem) => (
                  <S.UserItem
                    key={problem.id}
                    isSelected={!!selectedItems.problems.find((p) => p.id === problem.id)}
                    onClick={() => toggleItem('problems', problem)}>
                    <FaCode />
                    {problem.title}
                  </S.UserItem>
                )),
              )}
            </SelectionModal>
          )}
        </AnimatePresence>
      </S.Container>
    </S.PageContainer>
  );
};

export default memo(NewContest);
