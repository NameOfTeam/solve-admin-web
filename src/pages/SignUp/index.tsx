import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaKey,
  FaSpinner,
  FaShieldAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useSignup from '../../hooks/auth/useSignup';
import * as S from './style';

type InputType = 'email' | 'username' | 'password' | 'passwordConfirm' | 'key' | null;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { request, handleChange, isPending, mutate } = useSignup();
  const [focusedInput, setFocusedInput] = React.useState<InputType>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      mutate();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutate();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <S.Container>
      <S.LeftPanel>
        <motion.div
          className="content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <S.LogoContainer>
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <FaShieldAlt size={40} />
            </motion.div>
          </S.LogoContainer>
          <S.WelcomeText>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              관리자 등록
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              새로운 관리자 계정을 생성하여 시작하세요
            </motion.p>
          </S.WelcomeText>
        </motion.div>
      </S.LeftPanel>

      <S.RightPanel>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <S.FormTitle>회원가입</S.FormTitle>

          <S.FormContainer>
            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'email' ? '#3b82f6' : '#94a3b8',
                  }}
                >
                  <FaEnvelope />
                </motion.span>
                이메일
              </S.Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <S.Input
                  type="email"
                  name="email"
                  value={request.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="이메일을 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'username' ? '#3b82f6' : '#94a3b8',
                  }}
                >
                  <FaUser />
                </motion.span>
                아이디
              </S.Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <S.Input
                  name="username"
                  value={request.username}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="아이디를 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'password' ? '#3b82f6' : '#94a3b8',
                  }}
                >
                  <FaLock />
                </motion.span>
                비밀번호
              </S.Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <S.Input
                  type="password"
                  name="password"
                  value={request.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="비밀번호를 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'passwordConfirm' ? '#3b82f6' : '#94a3b8',
                  }}
                >
                  <FaLock />
                </motion.span>
                비밀번호 확인
              </S.Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <S.Input
                  type="password"
                  name="passwordConfirm"
                  value={request.passwordConfirm}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedInput('passwordConfirm')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'key' ? '#3b82f6' : '#94a3b8',
                  }}
                >
                  <FaKey />
                </motion.span>
                가입 키
              </S.Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <S.Input
                  type="password"
                  name="key"
                  value={request.key}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedInput('key')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="가입 키를 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <S.LoginButton type="submit" disabled={isPending}>
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaSpinner className="spinner" />
                      <span>가입 중...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="signup"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      가입하기
                    </motion.span>
                  )}
                </AnimatePresence>
              </S.LoginButton>
            </motion.div>

            <S.Divider>
              <span>또는</span>
            </S.Divider>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <S.SignupButton onClick={handleLoginClick} type="button">
                <FaSignInAlt />
                <span>로그인하기</span>
              </S.SignupButton>
            </motion.div>
          </S.FormContainer>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <S.SecurityNotice>
              <FaShieldAlt />
              <span>관리자 전용 시스템입니다</span>
            </S.SecurityNotice>
          </motion.div>
        </motion.form>
      </S.RightPanel>
    </S.Container>
  );
};

export default Signup;
