import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import useLogin from '../../hooks/auth/useLogin';
import * as S from './style';

const Login = () => {
  const { request, handleChange, isPending, mutate } = useLogin();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <form onSubmit={handleSubmit}>
        <S.Box>
          <S.Title>SOLVE ADMIN</S.Title>

          <S.FormGroup>
            <FaUser />
            <S.Input
              name="username"
              type="text"
              placeholder="Username"
              value={request.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />
          </S.FormGroup>

          <S.FormGroup>
            <FaLock />
            <S.Input
              name="password"
              type="password"
              placeholder="Password"
              value={request.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </S.FormGroup>

          <S.Button type="submit" disabled={isPending || !request.username || !request.password}>
            {isPending ? (
              <S.LoadingSpinner>
                <FaSpinner /> Loading...
              </S.LoadingSpinner>
            ) : (
              'Login'
            )}
          </S.Button>
        </S.Box>
      </form>
    </S.Container>
  );
};

export default Login;
