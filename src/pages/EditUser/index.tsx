import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaLock,
  FaUserShield,
  FaCamera,
  FaTrash,
  FaPlus,
  FaGithub,
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTwitch,
  FaYoutube,
  FaSteam,
  FaSpotify,
  FaXbox,
  FaFacebook,
  FaReddit,
  FaPaypal,
  FaTiktok,
  FaInfoCircle,
  FaQuoteLeft,
  FaMarkdown,
} from 'react-icons/fa';
import adminAxios from '../../libs/adminAxios';
import * as S from './style';
import { SiBattledotnet, SiEbay, SiLeagueoflegends } from 'react-icons/si';
import {
  UserConnectionAddRequest,
  UserConnectionType,
  UserResponse,
  UserUpdateRequest,
} from '../../types/user/user';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/common/error';

const getSocialIcon = (type: string) => {
  const iconProps = { size: 24 };
  switch (type) {
    case 'GITHUB':
      return <FaGithub {...iconProps} />;
    case 'DISCORD':
      return <FaDiscord {...iconProps} />;
    case 'TWITTER':
      return <FaTwitter {...iconProps} />;
    case 'X':
      return <FaTwitter {...iconProps} />;
    case 'INSTAGRAM':
      return <FaInstagram {...iconProps} />;
    case 'LINKEDIN':
      return <FaLinkedin {...iconProps} />;
    case 'TWITCH':
      return <FaTwitch {...iconProps} />;
    case 'YOUTUBE':
      return <FaYoutube {...iconProps} />;
    case 'STEAM':
      return <FaSteam {...iconProps} />;
    case 'SPOTIFY':
      return <FaSpotify {...iconProps} />;
    case 'XBOX':
      return <FaXbox {...iconProps} />;
    case 'FACEBOOK':
      return <FaFacebook {...iconProps} />;
    case 'REDDIT':
      return <FaReddit {...iconProps} />;
    case 'PAYPAL':
      return <FaPaypal {...iconProps} />;
    case 'TIKTOK':
      return <FaTiktok {...iconProps} />;
    case 'EBAY':
      return <SiEbay {...iconProps} />;
    case 'BATTLE_NET':
      return <SiBattledotnet {...iconProps} />;
    case 'LEAGUE_OF_LEGENDS':
      return <SiLeagueoflegends {...iconProps} />;
    default:
      return null;
  }
};

const EditUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserUpdateRequest>({
    password: '',
    introduction: '',
    role: '',
  });
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [newConnection, setNewConnection] = useState<UserConnectionAddRequest>({
    type: UserConnectionType.GITHUB,
    value: '',
  });
  const [showAddConnection, setShowAddConnection] = useState(false);

  const {
    data: user,
    status,
    isSuccess,
  } = useQuery<UserResponse>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await adminAxios.get(`/users/${userId}`);

      return data.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UserUpdateRequest) => {
      const payload: UserUpdateRequest = {};
      if (data.password) payload.password = data.password;
      if (data.role) payload.role = data.role;
      if (data.introduction) payload.introduction = data.introduction;

      await adminAxios.patch(`/users/${userId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      toast.success('사용자 정보가 업데이트되었습니다.');
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

      toast.success('프로필 사진이 변경되었습니다.');
    },
    onError: (error: AxiosError) => {
      const code = (error.response?.data as ErrorResponse).code;

      toast.error(`프로필 사진 변경에 실패했습니다. (${code})`);
    },
  });

  const addConnectionMutation = useMutation({
    mutationFn: async (data: UserConnectionAddRequest) => {
      await adminAxios.post(`/users/${userId}/connections`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      setNewConnection({ type: UserConnectionType.GITHUB, value: '' });
      setShowAddConnection(false);

      toast.success('계정 연결이 추가되었습니다.');
    },
  });

  const deleteConnectionMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      await adminAxios.delete(`/users/${userId}/connections/${connectionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      toast.success('계정 연결이 삭제되었습니다.');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewConnectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setNewConnection((prev) => ({
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

  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault();
    addConnectionMutation.mutate(newConnection);
  };

  const handleDeleteConnection = (connectionId: string) => {
    if (window.confirm('정말 이 연결을 삭제하시겠습니까?')) {
      deleteConnectionMutation.mutate(connectionId);
    }
  };

  useEffect(() => {
    if (isSuccess && user) {
      setFormData((prev) => ({
        ...prev,
        role: user.role,
      }));
    }
  }, [isSuccess, user]);

  if (status === 'pending') {
    return (
      <S.Container>
        <S.LoadingSpinner>
          <FaSpinner />
          <span>사용자 정보를 불러오는 중...</span>
        </S.LoadingSpinner>
      </S.Container>
    );
  }

  if (status === 'error' || !user) {
    return (
      <S.Container>
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
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft /> 돌아가기
        </S.BackButton>
        <S.SaveButton
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
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
        transition={{ delay: 0.2 }}
      >
        <S.FormHeader>
          <S.AvatarWrapper onClick={handleAvatarClick}>
            <S.Avatar
              src={previewImage || `${import.meta.env.VITE_API_URL}/avatars/${user.id}.webp`}
              alt={user.username}
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
          <S.UserDetails>
            <h1>사용자 정보 수정</h1>
            <S.Username>{user.username}</S.Username>
            <S.Email>{user.email}</S.Email>
          </S.UserDetails>
        </S.FormHeader>

        <S.FormSection>
          <S.SectionTitle>기본 정보</S.SectionTitle>
          <S.Form>
            <S.InputGroup>
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

            <S.InputGroup>
              <S.Label>
                <FaUserShield />
                역할
              </S.Label>
              <S.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="USER">일반 사용자</option>
                <option value="ADMIN">관리자</option>
              </S.Select>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label className={focusedField === 'introduction' ? 'focused' : ''}>
                <FaInfoCircle />
                소개
              </S.Label>
              <S.TextareaWrapper>
                <FaQuoteLeft className="quote-icon" />
                <S.Textarea
                  name="introduction"
                  value={formData.introduction || ''}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('introduction')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="사용자 소개를 입력하세요"
                  rows={4}
                />
              </S.TextareaWrapper>
              <S.InputHelp>
                <FaMarkdown />
                마크다운을 사용하여 소개글을 꾸밀 수 있습니다.
              </S.InputHelp>
            </S.InputGroup>
          </S.Form>
        </S.FormSection>

        <S.FormSection>
          <S.SectionHeader>
            <S.SectionTitle>연결된 계정</S.SectionTitle>
            <S.AddButton
              onClick={() => setShowAddConnection(!showAddConnection)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlus /> 계정 연결
            </S.AddButton>
          </S.SectionHeader>

          {showAddConnection && (
            <S.AddConnectionForm onSubmit={handleAddConnection}>
              <S.Select name="type" value={newConnection.type} onChange={handleNewConnectionChange}>
                {Object.values(UserConnectionType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </S.Select>
              <S.Input
                name="value"
                value={newConnection.value}
                onChange={handleNewConnectionChange}
                placeholder="사용자 아이디 또는 URL을 입력하세요"
              />
              <S.AddConnectionButton
                type="submit"
                disabled={addConnectionMutation.isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {addConnectionMutation.isPending ? <FaSpinner className="spinner" /> : '추가'}
              </S.AddConnectionButton>
            </S.AddConnectionForm>
          )}

          <S.ConnectionsGrid>
            {user.connections.map((connection) => (
              <S.ConnectionCard key={connection.id}>
                <S.ConnectionInfo>
                  {getSocialIcon(connection.type)}
                  <div>
                    <S.ConnectionType>{connection.type}</S.ConnectionType>
                    <S.ConnectionValue>{connection.value}</S.ConnectionValue>
                  </div>
                </S.ConnectionInfo>
                <S.DeleteButton
                  onClick={() => handleDeleteConnection(connection.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </S.DeleteButton>
              </S.ConnectionCard>
            ))}
          </S.ConnectionsGrid>
        </S.FormSection>

        {(avatarMutation.isError ||
          updateMutation.isError ||
          addConnectionMutation.isError ||
          deleteConnectionMutation.isError) && (
          <S.ErrorMessage>
            <strong>오류가 발생했습니다</strong>
            작업 처리에 실패했습니다.
          </S.ErrorMessage>
        )}
      </S.FormContainer>
    </S.Container>
  );
};

export default EditUser;
