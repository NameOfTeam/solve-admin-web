import useLogin from '../../hooks/auth/useLogin';
import * as S from './style';

const Login = () => {
  const { request, handleChange, isPending, mutate } = useLogin();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate();
    }
  };

  const handleClick = () => {
    mutate();
  };

  return (
    <S.Container>
      <S.Box>
        <S.Title>Solve Admin Login</S.Title>
        <S.Input
          name="username"
          type="text"
          placeholder="Username"
          value={request.username}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <S.Input
          name="password"
          type="password"
          placeholder="Password"
          value={request.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <S.Button onClick={handleClick} disabled={isPending}>
          {isPending ? 'Loading...' : 'Login'}
        </S.Button>
      </S.Box>
    </S.Container>
  );
};

export default Login;
