import { FaUser, FaLock, FaEnvelope, FaKey, FaSpinner } from 'react-icons/fa';
import useSignup from '../../hooks/auth/useSignup';
import * as S from './style';

const Signup = () => {
  const { request, handleChange, isPending, mutate } = useSignup();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      mutate();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <S.Container>
      <S.Box>
        <S.Title>SOLVE ADMIN - SIGNUP</S.Title>
        <form onSubmit={handleSubmit}>
          <S.FormGroup>
            <FaEnvelope />
            <S.Input
              type="email"
              name="email"
              placeholder="Email"
              value={request.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </S.FormGroup>

          <S.FormGroup>
            <FaUser />
            <S.Input
              type="text"
              name="username"
              placeholder="Username"
              value={request.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </S.FormGroup>

          <S.FormGroup>
            <FaLock />
            <S.Input
              type="password"
              name="password"
              placeholder="Password"
              value={request.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </S.FormGroup>

          <S.FormGroup>
            <FaLock />
            <S.Input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={request.passwordConfirm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </S.FormGroup>

          <S.FormGroup>
            <FaKey />
            <S.Input
              type="text"
              name="key"
              placeholder="Signup Key"
              value={request.key}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </S.FormGroup>

          <S.Button type="submit" disabled={isPending}>
            {isPending ? (
              <S.LoadingSpinner>
                <FaSpinner />
                Signing Up...
              </S.LoadingSpinner>
            ) : (
              'Sign Up'
            )}
          </S.Button>
        </form>
      </S.Box>
    </S.Container>
  );
};

export default Signup;
