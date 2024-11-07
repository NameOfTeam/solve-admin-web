import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import * as S from './style';
import ProblemPreview from '../../components/ProblemPreview';
import adminAxios from '../../libs/adminAxios';
import { toast } from 'react-toastify';
import { ProblemResponse } from '../../types/problem/problem';
import { WorkbookResponse } from '../../types/workbook';

const Workbook = () => {
  const { workbookId } = useParams<{ workbookId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [previewProblem, setPreviewProblem] = useState<ProblemResponse | null>(null);

  const {
    data: workbook,
    isLoading,
    isError,
  } = useQuery<WorkbookResponse>({
    queryKey: ['workbook', workbookId],
    queryFn: async () => {
      const { data } = await adminAxios.get(`/workbooks/${workbookId}`);
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await adminAxios.delete(`/workbooks/${workbookId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workbooks'] });
      toast.success('문제집이 삭제되었습니다.');
      navigate('/workbooks');
    },
    onError: () => {
      toast.error('문제집 삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말 이 문제집을 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <S.SpinnerIcon />
          <span>문제집 정보를 불러오는 중...</span>
        </S.LoadingWrapper>
      </S.Container>
    );
  }

  if (isError || !workbook) {
    return (
      <S.Container>
        <S.ErrorMessage>
          <strong>오류가 발생했습니다</strong>
          문제집 정보를 불러오는데 실패했습니다.
        </S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate('/workbooks')}>
          <S.BackIcon /> 목록으로
        </S.BackButton>
        <S.Actions>
          <S.EditButton onClick={() => navigate(`/workbooks/${workbookId}/edit`)}>
            <S.EditIcon /> 수정
          </S.EditButton>
          <S.DeleteButton onClick={handleDelete}>
            <S.DeleteIcon /> 삭제
          </S.DeleteButton>
        </S.Actions>
      </S.Header>

      <S.Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <S.TitleSection>
          <S.Title>{workbook.title}</S.Title>
          <S.MetaInfo>
            <S.MetaItem>
              <S.UserIcon />
              {workbook.author.username}
            </S.MetaItem>
            <S.MetaItem>
              <S.TimeIcon />
              {new Date(workbook.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </S.MetaItem>
            <S.MetaItem>
              <S.ProblemIcon />
              문제 {workbook.problems.length}개
            </S.MetaItem>
          </S.MetaInfo>
        </S.TitleSection>

        <S.ProblemSection>
          <S.SectionTitle>문제 목록</S.SectionTitle>
          <S.ProblemList>
            {workbook.problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <S.ProblemCard onClick={() => setPreviewProblem(problem as ProblemResponse)}>
                  <S.ProblemInfo>
                    <S.ProblemNumber>{index + 1}</S.ProblemNumber>
                    <div>
                      <S.ProblemTitle>{problem.title}</S.ProblemTitle>
                      <S.ProblemMeta>
                        <span>시간 제한: {problem.timeLimit}초</span>
                        <span>메모리 제한: {problem.memoryLimit}MB</span>
                      </S.ProblemMeta>
                    </div>
                  </S.ProblemInfo>
                  <S.PreviewButton>
                    <S.PreviewIcon />
                  </S.PreviewButton>
                </S.ProblemCard>
              </motion.div>
            ))}
          </S.ProblemList>
        </S.ProblemSection>
      </S.Content>

      <AnimatePresence>
        {previewProblem && (
          <ProblemPreview problem={previewProblem} onClose={() => setPreviewProblem(null)} />
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default Workbook;
