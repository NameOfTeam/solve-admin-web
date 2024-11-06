import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaUser,
  FaLock,
  FaUserShield,
  FaCamera,
  FaEnvelope,
} from 'react-icons/fa';
import adminAxios from '../../libs/adminAxios';
import * as S from './style';

interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface UpdateUserRequest {
  password?: string;
  role?: string;
}

const EditUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<UpdateUserRequest>({
    password: '',
    role: '',
  });
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const { data: user, status } = useQuery<UserResponse>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await adminAxios.get(`/users/${userId}`);
      return response.data.data;
    },
    onSuccess: (data) => {
      setFormData((prev) => ({
        ...prev,
        role: data.role,
      }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      const payload: UpdateUserRequest = {};
      if (data.password) payload.password = data.password;
      if (data.role) payload.role = data.role;

      await adminAxios.patch(`/users/${userId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      navigate(`/users/${userId}`);
    },
  });

  const avatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      await adminAxios.patch(`/users/${userId}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      avatarMutation.mutate(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

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
          onClick={() => navigate(`/users/${userId}`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <FaArrowLeft /> 돌아가기
        </S.BackButton>
        <S.SaveButton
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          {updateMutation.isPending ? (
            <>
              <FaSpinner className="spinner" /> 저장 중...
            </>
          ) : (
            <>
              <FaSave /> 저장
            </>
          )}
        </S.SaveButton>
      </S.Header>

      <S.FormContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}>
        <S.UserProfile>
          <S.AvatarSection>
            <S.AvatarWrapper onClick={handleAvatarClick}>
              <S.Avatar
                src={previewImage || `${import.meta.env.VITE_API_URL}/avatars/${user.id}.webp`}
                alt={user.username}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <S.AvatarOverlay initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                <FaCamera />
                <span>변경</span>
              </S.AvatarOverlay>
            </S.AvatarWrapper>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </S.AvatarSection>

          <S.UserInfo>
            <S.Username>{user.username}</S.Username>
            <S.UserDetails>
              <S.DetailRow>
                <FaUser />
                <span>아이디: {user.id}</span>
              </S.DetailRow>
              <S.DetailRow>
                <FaEnvelope />
                <span>이메일: {user.email}</span>
              </S.DetailRow>
              <S.DetailRow>
                <FaUserShield />
                <span>현재 역할: {user.role}</span>
              </S.DetailRow>
            </S.UserDetails>
          </S.UserInfo>
        </S.UserProfile>

        <S.FormSection>
          <S.SectionTitle>정보 수정</S.SectionTitle>
          <S.Form onSubmit={handleSubmit}>
            <S.InputGroup
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}>
              <S.Label>
                <FaLock />새 비밀번호
              </S.Label>
              <S.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="변경할 비밀번호를 입력하세요"
              />
            </S.InputGroup>

            <S.InputGroup
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}>
              <S.Label>
                <FaUserShield />
                역할 변경
              </S.Label>
              <S.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="USER">일반 사용자</option>
                <option value="ADMIN">관리자</option>
              </S.Select>
            </S.InputGroup>

            {(avatarMutation.isError || updateMutation.isError) && (
              <S.ErrorMessage>
                <strong>오류가 발생했습니다</strong>
                사용자 정보 수정에 실패했습니다.
              </S.ErrorMessage>
            )}
          </S.Form>
        </S.FormSection>
      </S.FormContainer>
    </S.Container>
  );
};

export default EditUser;
