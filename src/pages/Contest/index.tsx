import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaClock,
  FaUser,
  FaUsers,
  FaBook,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from 'react-icons/fa';
import adminAxios from '../../libs/adminAxios';
import * as S from './style';

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

const Contest = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: contest, status } = useQuery<ContestResponse>({
    queryKey: ['contest', contestId],
    queryFn: async () => {
      const response = await adminAxios.get(`/contests/${contestId}`);
      return response.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await adminAxios.delete(`/contests/${contestId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contests'] });
      navigate('/contests');
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getContestStatus = () => {
    if (!contest) return 'ended';

    const now = new Date();
    const start = new Date(contest.startAt);
    const end = new Date(contest.endAt);

    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'ongoing';
  };

  if (status === 'pending') {
    return (
      <S.Container>
        <S.LoadingSpinner>
          <FaSpinner />
          <span>대회 정보를 불러오는 중...</span>
        </S.LoadingSpinner>
      </S.Container>
    );
  }

  if (status === 'error' || !contest) {
    return (
      <S.Container>
        <S.ErrorMessage>
          <strong>오류가 발생했습니다</strong>
          대회 정보를 불러오는데 실패했습니다.
        </S.ErrorMessage>
      </S.Container>
    );
  }

  const contestStatus = getContestStatus();

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate('/contests')}>
          <FaArrowLeft /> 목록으로 돌아가기
        </S.BackButton>
        <S.ActionButtons>
          <S.EditButton onClick={() => navigate(`/contests/${contestId}/edit`)}>
            <FaEdit /> 수정
          </S.EditButton>
          <S.DeleteButton
            onClick={() => {
              if (window.confirm('정말 삭제하시겠습니까?')) {
                deleteMutation.mutate();
              }
            }}>
            <FaTrash /> 삭제
          </S.DeleteButton>
        </S.ActionButtons>
      </S.Header>

      <S.ContestContainer>
        <S.ContestHeader>
          <S.TitleSection>
            <S.ContestTitle>{contest.title}</S.ContestTitle>
            <S.StatusBadge status={contestStatus}>
              {contestStatus === 'upcoming' && '예정된 대회'}
              {contestStatus === 'ongoing' && '진행 중'}
              {contestStatus === 'ended' && '종료됨'}
            </S.StatusBadge>
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
          </S.TitleSection>

          <S.MetaInfo>
            <S.MetaItem>
              <FaClock />
              <div>
                <div>시작: {formatDate(contest.startAt)}</div>
                <div>종료: {formatDate(contest.endAt)}</div>
              </div>
            </S.MetaItem>
            <S.MetaItem>
              <FaUser />
              <span>주최자: {contest.owner.username}</span>
            </S.MetaItem>
          </S.MetaInfo>
        </S.ContestHeader>

        <S.Section>
          <S.SectionTitle>대회 설명</S.SectionTitle>
          <S.Description>{contest.description}</S.Description>
        </S.Section>

        <S.Grid>
          <S.Section>
            <S.SectionTitle>
              <FaBook /> 문제 목록
            </S.SectionTitle>
            <S.List>
              {contest.problems.map((problem, index) => (
                <S.ListItem key={index}>{problem.title}</S.ListItem>
              ))}
            </S.List>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <FaUsers /> 운영진
            </S.SectionTitle>
            <S.List>
              {contest.operators.map((operator) => (
                <S.ListItem key={operator.id}>{operator.username}</S.ListItem>
              ))}
            </S.List>
          </S.Section>
        </S.Grid>

        <S.Section>
          <S.SectionTitle>
            <FaUsers /> 참가자 ({contest.participants.length}명)
          </S.SectionTitle>
          <S.ParticipantGrid>
            {contest.participants.map((participant) => (
              <S.ParticipantCard key={participant.id}>
                <S.Avatar
                  src={`${import.meta.env.VITE_API_URL}/avatars/${participant.id}.webp`}
                  alt={participant.username}
                />
                <span>{participant.username}</span>
              </S.ParticipantCard>
            ))}
          </S.ParticipantGrid>
        </S.Section>
      </S.ContestContainer>
    </S.Container>
  );
};

export default Contest;
