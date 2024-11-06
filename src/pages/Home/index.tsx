import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaTrophy, FaUsers, FaChartLine, FaCog, FaArrowRight } from 'react-icons/fa';
import * as S from './style';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '문제 관리',
      description: '알고리즘 문제를 생성하고 관리합니다',
      icon: <FaCode />,
      path: '/problems',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      delay: 0.2,
    },
    {
      title: '대회 관리',
      description: '코딩 대회를 개설하고 운영합니다',
      icon: <FaTrophy />,
      path: '/contests',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
      delay: 0.3,
    },
    {
      title: '사용자 관리',
      description: '사용자의 권한과 활동을 관리합니다',
      icon: <FaUsers />,
      path: '/users',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      delay: 0.4,
    },
    {
      title: '통계',
      description: '플랫폼의 사용 현황을 분석합니다',
      icon: <FaChartLine />,
      path: '/statistics',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      delay: 0.5,
    },
    {
      title: '로그',
      description: '시스템의 로그를 확인합니다',
      icon: <FaCog />,
      path: '/logs',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d9480f 100%)',
      delay: 0.6,
    },
    {
      title: '설정',
      description: '시스템의 환경을 설정합니다',
      icon: <FaCog />,
      path: '/settings',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      delay: 0.6,
    },
  ];

  return (
    <S.Container>
      <S.GradientBackground>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.Header>
            <S.Highlight>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <S.Title>
                    <motion.span
                      initial={{ backgroundPosition: '0% 50%' }}
                      animate={{ backgroundPosition: '100% 50%' }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      SOLVE
                    </motion.span>{' '}
                    <span>Admin</span>
                  </S.Title>
                </motion.div>
              </motion.div>
            </S.Highlight>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <S.SubTitle>코딩 플랫폼을 더 스마트하게</S.SubTitle>
            </motion.div>
          </S.Header>
        </motion.div>

        <S.MenuGrid>
          {menuItems.map((item) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: item.delay,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              <S.MenuItem
                onClick={() => navigate(item.path)}
                whileHover="hover"
                background={item.gradient}
              >
                <S.IconWrapper className="icon-section">
                  <motion.div
                    className="icon-wrapper"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                </S.IconWrapper>

                <S.MenuContent>
                  <S.MenuTitle>{item.title}</S.MenuTitle>
                  <S.MenuDescription>{item.description}</S.MenuDescription>
                </S.MenuContent>

                <motion.div
                  className="arrow"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight />
                </motion.div>
              </S.MenuItem>
            </motion.div>
          ))}
        </S.MenuGrid>

        <S.BackgroundOrbs>
          <motion.div
            className="orb orb1"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="orb orb2"
            animate={{
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="orb orb3"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </S.BackgroundOrbs>
      </S.GradientBackground>
    </S.Container>
  );
};

export default Home;
