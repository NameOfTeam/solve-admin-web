import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import * as S from './style';

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const numberVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <S.Container as={motion.div} variants={containerVariants} initial="initial" animate="animate">
      <S.Background>
        <motion.div
          variants={circleVariants}
          animate="animate"
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 70%)',
            zIndex: 0,
          }}
        />
      </S.Background>

      <S.Content>
        <S.ErrorCode>
          <motion.span variants={numberVariants}>4</motion.span>
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              transition: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
          >
            <FaExclamationTriangle size={60} />
          </motion.div>
          <motion.span variants={numberVariants}>4</motion.span>
        </S.ErrorCode>

        <motion.div variants={itemVariants}>
          <S.Title>페이지를 찾을 수 없습니다</S.Title>
        </motion.div>

        <motion.div variants={itemVariants}>
          <S.Description>
            요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
          </S.Description>
        </motion.div>

        <motion.div variants={itemVariants}>
          <S.ButtonContainer>
            <S.Button onClick={() => navigate(-1)} secondary>
              이전 페이지
            </S.Button>
            <S.Button onClick={() => navigate('/')} primary>
              <FaHome size={18} />
              홈으로 가기
            </S.Button>
          </S.ButtonContainer>
        </motion.div>
      </S.Content>
    </S.Container>
  );
};

export default NotFound;
