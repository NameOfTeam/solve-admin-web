import { useNavigate } from 'react-router-dom';
import { FaCode, FaTrophy, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';
import * as S from './style';

const AdminHome = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '문제 관리',
      description: '알고리즘 문제 생성 및 관리',
      icon: <FaCode />,
      path: '/problems',
      bgColor: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    {
      title: '대회 관리',
      description: '코딩 대회 생성 및 관리',
      icon: <FaTrophy />,
      path: '/contests',
      bgColor: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    },
    {
      title: '사용자 관리',
      description: '사용자 권한 및 활동 관리',
      icon: <FaUsers />,
      path: '/users',
      bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    },
    {
      title: '통계',
      description: '플랫폼 사용 현황 및 분석',
      icon: <FaChartLine />,
      path: '/statistics',
      bgColor: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    },
    {
      title: '설정',
      description: '시스템 설정 및 환경 구성',
      icon: <FaCog />,
      path: '/settings',
      bgColor: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>어드민 대시보드</S.Title>
        <S.SubTitle>SOLVE 플랫폼 관리 시스템</S.SubTitle>
      </S.Header>

      <S.MenuGrid>
        {menuItems.map((item) => (
          <S.MenuItem
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{ background: item.bgColor }}
          >
            <S.MenuIcon>{item.icon}</S.MenuIcon>
            <S.MenuContent>
              <S.MenuTitle>{item.title}</S.MenuTitle>
              <S.MenuDescription>{item.description}</S.MenuDescription>
            </S.MenuContent>
          </S.MenuItem>
        ))}
      </S.MenuGrid>
    </S.Container>
  );
};

export default AdminHome;
