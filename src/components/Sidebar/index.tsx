import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaCode,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBrain,
  FaBars,
  FaTimes,
  FaBook,
} from 'react-icons/fa';
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
    title: '문제집 관리',
    icon: <FaBook />,
    path: '/workbooks',
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {isMobile && (
        <S.MobileMenuButton
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBars />
        </S.MobileMenuButton>
      )}

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <>
            {isMobile && (
              <S.Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
            )}

            <S.SidebarContainer
              initial={isMobile ? 'closed' : false}
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              isMobile={isMobile}
            >
              {isMobile && (
                <S.CloseButton
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </S.CloseButton>
              )}

              <S.LogoContainer onClick={() => handleNavigation('/')}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <S.Logo>SOLVE</S.Logo>
                  <S.LogoSubtitle>Admin</S.LogoSubtitle>
                </motion.div>
              </S.LogoContainer>

              <S.MenuContainer>
                {menuItems.map((item, index) => (
                  <S.MenuItem
                    key={item.path}
                    active={location.pathname === item.path}
                    onClick={() => handleNavigation(item.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <S.MenuIcon active={location.pathname === item.path}>{item.icon}</S.MenuIcon>
                    <S.MenuTitle active={location.pathname === item.path}>{item.title}</S.MenuTitle>
                  </S.MenuItem>
                ))}
              </S.MenuContainer>

              <S.FooterContainer>
                <S.FooterText>© SOLVE</S.FooterText>
              </S.FooterContainer>
            </S.SidebarContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
