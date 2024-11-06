import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaSpinner, FaShieldAlt } from 'react-icons/fa';
import useLogin from '../../hooks/auth/useLogin';
import * as S from './style';

type InputType = 'username' | 'password' | null;

const Login: React.FC = () => {
  const { request, handleChange, isPending, mutate } = useLogin();
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

  const handleInputFocus = (inputName: InputType): void => {
    setFocusedInput(inputName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(e);
  };

  return (
    <S.Container>
      <motion.div
        className="background-gradient"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <S.Box>
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="header-container">
            <S.LogoContainer>
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}>
                <FaShieldAlt size={40} />
              </motion.div>
            </S.LogoContainer>
            <S.Title>SOLVE ADMIN</S.Title>
            <S.Subtitle>관리자 로그인</S.Subtitle>
          </motion.div>

          <S.FormContainer>
            <S.FormGroup>
              <S.Label htmlFor="username">
                <motion.span
                  initial={{ x: 0 }}
                  animate={{
                    x: focusedInput === 'username' || request.username ? -4 : 0,
                    color: focusedInput === 'username' ? '#3b82f6' : '#94a3b8',
                  }}>
                  <FaUser />
                </motion.span>
                Username
              </S.Label>
              <S.InputWrapper>
                <S.Input
                  id="username"
                  name="username"
                  type="text"
                  value={request.username}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => handleInputFocus('username')}
                  onBlur={() => handleInputFocus(null)}
                  autoComplete="username"
                  aria-label="Username"
                />
                <S.InputBackground
                  initial={false}
                  animate={{
                    opacity: focusedInput === 'username' || request.username ? 1 : 0,
                    scale: focusedInput === 'username' || request.username ? 1 : 0.98,
                  }}
                />
              </S.InputWrapper>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="password">
                <motion.span
                  initial={{ x: 0 }}
                  animate={{
                    x: focusedInput === 'password' || request.password ? -4 : 0,
                    color: focusedInput === 'password' ? '#3b82f6' : '#94a3b8',
                  }}>
                  <FaLock />
                </motion.span>
                Password
              </S.Label>
              <S.InputWrapper>
                <S.Input
                  id="password"
                  name="password"
                  type="password"
                  value={request.password}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={() => handleInputFocus(null)}
                  autoComplete="current-password"
                  aria-label="Password"
                />
                <S.InputBackground
                  initial={false}
                  animate={{
                    opacity: focusedInput === 'password' || request.password ? 1 : 0,
                    scale: focusedInput === 'password' || request.password ? 1 : 0.98,
                  }}
                />
              </S.InputWrapper>
            </S.FormGroup>
          </S.FormContainer>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%' }}>
            <S.Button
              type="submit"
              disabled={isPending || !request.username || !request.password}
              aria-label={isPending ? 'Loading...' : 'Login'}>
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <S.LoadingSpinner>
                      <FaSpinner /> Loading...
                    </S.LoadingSpinner>
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </S.Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <S.SecurityNotice>
              <FaShieldAlt size={14} />
              관리자 전용 로그인입니다
            </S.SecurityNotice>
          </motion.div>
        </S.Box>
      </motion.form>
    </S.Container>
  );
};

export default Login;
