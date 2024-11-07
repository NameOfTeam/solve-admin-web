import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FaArrowLeft,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
  FaKeyboard,
  FaMemory,
  FaSpinner,
  FaTrash,
  FaUser,
} from 'react-icons/fa';
import * as S from './style';
import { ProblemResponse } from '../../types/problem/problem';
import adminAxios from '../../libs/adminAxios';

const Problem = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: problem, isLoading } = useQuery<ProblemResponse>({
    queryKey: ['problem', problemId],
    queryFn: async () => {
      const response = await adminAxios.get(`/problems/${problemId}`);
      return response.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await adminAxios.delete(`/problems/${problemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
      navigate('/problems');
    },
  });

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingSpinner>
          <FaSpinner /> 문제 정보를 불러오는 중...
        </S.LoadingSpinner>
      </S.Container>
    );
  }

  if (!problem) {
    return (
      <S.Container>
        <S.Alert>
          <FaExclamationTriangle />
          문제를 찾을 수 없습니다.
        </S.Alert>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate('/problems')}>
          <FaArrowLeft /> 목록으로 돌아가기
        </S.BackButton>
        <S.ActionButtons>
          <S.EditButton onClick={() => navigate(`/problems/${problemId}/edit`)}>
            <FaEdit /> 수정
          </S.EditButton>
          <S.DeleteButton onClick={() => setShowDeleteModal(true)}>
            <FaTrash /> 삭제
          </S.DeleteButton>
        </S.ActionButtons>
      </S.Header>

      <S.MainContent>
        <S.TitleSection>
          <S.Title>{problem.title}</S.Title>
          <S.MetaData>
            <S.MetaItem>
              <FaUser /> 작성자: <strong>{problem.author.username}</strong>
            </S.MetaItem>
            <S.MetaItem>
              <FaClock /> 시간 제한: <strong>{problem.timeLimit.toFixed(1)}초</strong>
            </S.MetaItem>
            <S.MetaItem>
              <FaMemory /> 메모리 제한: <strong>{problem.memoryLimit}MB</strong>
            </S.MetaItem>
          </S.MetaData>
        </S.TitleSection>

        <S.ContentSection>
          <S.Section>
            <S.SectionTitle>
              <FaBook /> 문제 설명
            </S.SectionTitle>
            <S.Content>{problem.content}</S.Content>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FaKeyboard /> 입력
            </S.SectionTitle>
            <S.Content>{problem.input}</S.Content>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FaCheckCircle /> 출력
            </S.SectionTitle>
            <S.Content>{problem.output}</S.Content>
          </S.Section>

          <S.Section>
            <S.SectionTitle>테스트 케이스</S.SectionTitle>
            {problem.testCases.map((testCase, index) => (
              <S.TestCaseSection key={testCase.id}>
                <S.TestCaseHeader>테스트 케이스 #{index + 1}</S.TestCaseHeader>
                <S.TestCaseContent>
                  <S.TestCaseItem>
                    <h4>입력</h4>
                    <pre>{testCase.input}</pre>
                  </S.TestCaseItem>
                  <S.TestCaseItem>
                    <h4>출력</h4>
                    <pre>{testCase.output}</pre>
                  </S.TestCaseItem>
                </S.TestCaseContent>
              </S.TestCaseSection>
            ))}
          </S.Section>
        </S.ContentSection>
      </S.MainContent>

      {showDeleteModal && (
        <S.DeleteConfirmModal>
          <S.ModalContent>
            <h3>문제 삭제</h3>
            <p>
              정말로 이 문제를 삭제하시겠습니까?
              <br />이 작업은 되돌릴 수 없습니다.
            </p>
            <S.ModalButtons>
              <S.Button onClick={() => setShowDeleteModal(false)}>취소</S.Button>
              <S.DeleteButton
                onClick={() => {
                  deleteMutation.mutate();
                  setShowDeleteModal(false);
                }}
              >
                {deleteMutation.isPending ? (
                  <>
                    <FaSpinner /> 삭제 중...
                  </>
                ) : (
                  <>
                    <FaTrash /> 삭제
                  </>
                )}
              </S.DeleteButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.DeleteConfirmModal>
      )}
    </S.Container>
  );
};

export default Problem;
