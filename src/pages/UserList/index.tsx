import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useGetUsers from '../../hooks/user/useGetUsers';
import * as S from './style';

const UserList = () => {
  const { data, ref, fetchNextPage } = useGetUsers();

  return (
    <S.Container>
      <S.Title>User List</S.Title>

      <S.UserWrapper>
        {data ? (
          data.pages.map((page) =>
            page.content.map((user) => (
              <S.User key={user.username}>{user.username}</S.User>
            ))
          )
        ) : (
          <div>Loading...</div>
        )}
      </S.UserWrapper>

      <button onClick={() => fetchNextPage()}>Fetch Next Page</button>

      <div
        ref={ref}
        style={{ width: '100px', height: '1px', backgroundColor: 'red' }}
      />

      <ReactQueryDevtools />
    </S.Container>
  );
};

export default UserList;
