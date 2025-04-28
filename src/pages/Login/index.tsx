import { AnimatePresence, motion } from 'framer-motion';
import { FaLock, FaShieldAlt, FaSpinner, FaUser, FaUserPlus } from 'react-icons/fa';
import useLogin from '../../hooks/auth/useLogin';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { FormEvent, KeyboardEvent, useState } from 'react';

type InputType = 'email' | 'password' | null;

const Login = () => {
  const navigate = useNavigate();
  const { request, handleChange, isPending, mutate } = useLogin();
  const [focusedInput, setFocusedInput] = useState<InputType>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      mutate();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutate();
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <S.Container>
      <S.LeftPanel>
        <motion.div
          className="content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <S.LogoContainer>
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}>
              <FaShieldAlt size={40} />
            </motion.div>
          </S.LogoContainer>
          <S.WelcomeText>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>
              Solve Admin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              관리자 전용 시스템에 오신 것을 환영합니다
            </motion.p>
          </S.WelcomeText>
        </motion.div>
      </S.LeftPanel>

      <S.RightPanel>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <S.FormTitle>로그인</S.FormTitle>

          <S.FormContainer>
            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'email' ? '#3b82f6' : '#94a3b8',
                  }}>
                  <FaUser />
                </motion.span>
                이메일
              </S.Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <S.Input
                  name="email"
                  value={request.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  autoComplete="email"
                  placeholder="아이디를 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>
                <motion.span
                  animate={{
                    color: focusedInput === 'password' ? '#3b82f6' : '#94a3b8',
                  }}>
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
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력하세요"
                />
              </motion.div>
            </S.InputGroup>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <S.LoginButton
                type="submit"
                disabled={isPending || !request.email || !request.password}>
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <FaSpinner className="spinner" />
                      <span>로그인 중...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      로그인
                    </motion.span>
                  )}
                </AnimatePresence>
              </S.LoginButton>
            </motion.div>

            <S.Divider>
              <span>또는</span>
            </S.Divider>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <S.SignupButton onClick={handleSignupClick} type="button">
                <FaUserPlus />
                <span>회원가입</span>
              </S.SignupButton>
            </motion.div>
          </S.FormContainer>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}>
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

export default Login;
