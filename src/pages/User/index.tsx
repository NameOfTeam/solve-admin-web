import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft, FaEdit, FaUser, FaEnvelope, FaUserShield, FaSpinner } from 'react-icons/fa';
import adminAxios from '../../libs/adminAxios';
import * as S from './style';
import { UserResponse } from '../../types/user/user';

const User = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { data: user, status } = useQuery<UserResponse>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await adminAxios.get(`/users/${userId}`);
      return response.data.data;
    },
  });

  if (status === 'pending') {
    return (
      <S.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <S.LoadingSpinner>
          <FaSpinner />
          <span>사용자 정보를 불러오는 중...</span>
        </S.LoadingSpinner>
      </S.Container>
    );
  }

  if (status === 'error' || !user) {
    return (
      <S.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <S.ErrorMessage>
          <strong>오류가 발생했습니다</strong>
          사용자 정보를 불러오는데 실패했습니다.
        </S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <S.Header>
        <S.BackButton
          onClick={() => navigate('/users')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <FaArrowLeft /> 목록으로 돌아가기
        </S.BackButton>
        <S.EditButton
          onClick={() => navigate(`/users/${userId}/edit`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <FaEdit /> 수정
        </S.EditButton>
      </S.Header>

      <S.UserContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}>
        <S.UserHeader>
          <S.AvatarSection>
            <S.Avatar
              src={`${import.meta.env.VITE_API_URL}/avatars/${user.id}.webp`}
              alt={user.username}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <S.UserInfo>
              <S.Username>{user.username}</S.Username>
              <S.RoleBadge>{user.role}</S.RoleBadge>
            </S.UserInfo>
          </S.AvatarSection>

          <S.DetailsList>
            <S.DetailItem
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}>
              <FaUser />
              <span>아이디: {user.id}</span>
            </S.DetailItem>

            <S.DetailItem
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}>
              <FaEnvelope />
              <span>이메일: {user.email}</span>
            </S.DetailItem>

            <S.DetailItem
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}>
              <FaUserShield />
              <span>역할: {user.role}</span>
            </S.DetailItem>
          </S.DetailsList>
        </S.UserHeader>
      </S.UserContainer>
    </S.Container>
  );
};

export default User;
