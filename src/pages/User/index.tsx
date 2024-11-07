import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaDiscord,
  FaEdit,
  FaEnvelope,
  FaFacebook,
  FaFire,
  FaGithub,
  FaInfoCircle,
  FaInstagram,
  FaLinkedin,
  FaPaypal,
  FaReddit,
  FaSpinner,
  FaSpotify,
  FaSteam,
  FaTiktok,
  FaTrophy,
  FaTwitch,
  FaTwitter,
  FaUser,
  FaUserShield,
  FaXbox,
  FaYoutube,
} from 'react-icons/fa';
import { SiBattledotnet, SiEbay, SiLeagueoflegends } from 'react-icons/si';
import adminAxios from '../../libs/adminAxios';
import * as S from './style';
import { UserConnection, UserResponse } from '../../types/user/user';

const getSocialIcon = (type: string) => {
  const iconProps = { size: 20 };
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

const getSocialUrl = (connection: UserConnection) => {
  const { type, value } = connection;
  switch (type) {
    case 'GITHUB':
      return `https://github.com/${value}`;
    case 'DISCORD':
      return `discord://${value}`;
    case 'TWITTER':
      return `https://twitter.com/${value}`;
    case 'X':
      return `https://twitter.com/${value}`;
    case 'INSTAGRAM':
      return `https://instagram.com/${value}`;
    case 'LINKEDIN':
      return `https://linkedin.com/in/${value}`;
    case 'TWITCH':
      return `https://twitch.tv/${value}`;
    case 'YOUTUBE':
      return `https://youtube.com/${value}`;
    case 'STEAM':
      return `https://steamcommunity.com/id/${value}`;
    case 'SPOTIFY':
      return `https://open.spotify.com/user/${value}`;
    case 'XBOX':
      return `https://xbox.com/profile/${value}`;
    case 'FACEBOOK':
      return `https://facebook.com/${value}`;
    case 'REDDIT':
      return `https://reddit.com/user/${value}`;
    case 'PAYPAL':
      return `https://paypal.me/${value}`;
    case 'TIKTOK':
      return `https://tiktok.com/@${value}`;
    case 'EBAY':
      return `https://ebay.com/usr/${value}`;
    case 'BATTLE_NET':
      return `https://battle.net/profile/${value}`;
    case 'LEAGUE_OF_LEGENDS':
      return `https://op.gg/summoner/userName=${value}`;
    case 'DOMAIN':
      return value.startsWith('http') ? value : `https://${value}`;
    default:
      return '#';
  }
};

const colorScale = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

const getColorByCount = (count: number) => {
  if (count === 0) return colorScale[0];
  if (count <= 2) return colorScale[1];
  if (count <= 4) return colorScale[2];
  if (count <= 6) return colorScale[3];
  return colorScale[4];
};

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

  const years = useMemo(() => {
    if (!user?.grass) return [];
    const dates = Object.keys(user.grass);
    const uniqueYears = [...new Set(dates.map((date) => new Date(date).getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, [user?.grass]);

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
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft /> 목록으로 돌아가기
        </S.BackButton>
        <S.EditButton
          onClick={() => navigate(`/users/${userId}/edit`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaEdit /> 수정
        </S.EditButton>
      </S.Header>

      <S.UserContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
            <S.DetailItem>
              <FaUser />
              <span>아이디: {user.id}</span>
            </S.DetailItem>

            <S.DetailItem>
              <FaEnvelope />
              <span>이메일: {user.email}</span>
            </S.DetailItem>

            <S.DetailItem>
              <FaUserShield />
              <span>역할: {user.role}</span>
            </S.DetailItem>
          </S.DetailsList>

          <S.StatsGrid>
            <S.StatCard>
              <FaFire />
              <div>
                <S.StatValue>{user.streak}일</S.StatValue>
                <S.StatLabel>연속 문제 풀이</S.StatLabel>
              </div>
            </S.StatCard>

            <S.StatCard>
              <FaTrophy />
              <div>
                <S.StatValue>{user.maxStreak}일</S.StatValue>
                <S.StatLabel>최대 연속 풀이</S.StatLabel>
              </div>
            </S.StatCard>

            <S.StatCard>
              <FaCalendarAlt />
              <div>
                <S.StatValue>{user.solvedCount}문제</S.StatValue>
                <S.StatLabel>총 해결 문제</S.StatLabel>
              </div>
            </S.StatCard>
          </S.StatsGrid>
        </S.UserHeader>

        {user.introduction && (
          <S.Section>
            <S.SectionTitle>
              <FaInfoCircle />
              소개
            </S.SectionTitle>
            <S.Introduction>{user.introduction}</S.Introduction>
          </S.Section>
        )}

        {user.grass && (
          <S.Section>
            <S.SectionTitle>문제 풀이 기록</S.SectionTitle>
            {years.map((year) => (
              <S.GrassSection key={year}>
                <S.GrassYear>{year}년</S.GrassYear>
                <S.GrassContainer>
                  {Array.from({ length: 53 }).map((_, weekIndex) => (
                    <S.GrassWeek key={weekIndex}>
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const date = new Date(year, 0, 1);
                        date.setDate(date.getDate() + (weekIndex * 7 + dayIndex));
                        const dateStr = date.toISOString().split('T')[0];
                        const count = user.grass[dateStr] || 0;

                        return (
                          <S.GrassDay
                            key={dayIndex}
                            color={getColorByCount(count)}
                            title={`${dateStr}: ${count}문제 해결`}
                          />
                        );
                      })}
                    </S.GrassWeek>
                  ))}
                </S.GrassContainer>
                <S.GrassLegend>
                  <span>기여도:</span>
                  {colorScale.map((color, index) => (
                    <S.GrassLegendItem key={color} color={color}>
                      {index === 0
                        ? '0'
                        : index === 1
                          ? '1-2'
                          : index === 2
                            ? '3-4'
                            : index === 3
                              ? '5-6'
                              : '7+'}
                    </S.GrassLegendItem>
                  ))}
                </S.GrassLegend>
              </S.GrassSection>
            ))}
          </S.Section>
        )}

        {user.connections && user.connections.length > 0 && (
          <S.Section>
            <S.SectionTitle>연결된 계정</S.SectionTitle>
            <S.ConnectionsGrid>
              {user.connections.map((connection) => (
                <S.ConnectionCard
                  key={connection.id}
                  href={getSocialUrl(connection)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getSocialIcon(connection.type)}
                  <span>{connection.value}</span>
                </S.ConnectionCard>
              ))}
            </S.ConnectionsGrid>
          </S.Section>
        )}
      </S.UserContainer>
    </S.Container>
  );
};

export default User;
