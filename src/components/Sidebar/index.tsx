import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCode, FaTrophy, FaUsers, FaChartLine, FaCog, FaBrain } from 'react-icons/fa';
import * as S from './style';

const menuItems = [
  {
    title: '홈',
    icon: <FaHome />,
    path: '/',
  },
  {
    title: '문제 관리',
    icon: <FaCode />,
    path: '/problems',
  },
  {
    title: '대회 관리',
    icon: <FaTrophy />,
    path: '/contests',
  },
  {
    title: '사용자 관리',
    icon: <FaUsers />,
    path: '/users',
  },
  {
    title: '통계',
    icon: <FaChartLine />,
    path: '/statistics',
  },
  {
    title: '로그 (With AI)',
    icon: <FaBrain />,
    path: '/logs',
  },
  {
    title: '설정',
    icon: <FaCog />,
    path: '/settings',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <S.SidebarContainer>
      <S.LogoContainer onClick={() => navigate('/')}>
        <S.Logo>SOLVE</S.Logo>
        <S.LogoSubtitle>Admin</S.LogoSubtitle>
      </S.LogoContainer>

      <S.MenuContainer>
        {menuItems.map((item) => (
          <S.MenuItem
            key={item.path}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}>
            <S.MenuIcon active={location.pathname === item.path}>{item.icon}</S.MenuIcon>
            <S.MenuTitle active={location.pathname === item.path}>{item.title}</S.MenuTitle>
          </S.MenuItem>
        ))}
      </S.MenuContainer>

      <S.FooterContainer>
        <S.FooterText>© 2024 SOLVE Platform</S.FooterText>
      </S.FooterContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
