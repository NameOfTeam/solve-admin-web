import { useParams } from 'react-router-dom';
import * as S from './style';
import useGetUser from '../../hooks/user/useGetUser';

type UserParams = {
  userId: string;
};

const User = () => {
  const { userId } = useParams() as UserParams;
  const { data, isLoading } = useGetUser(userId);

  return (
    <S.Container>
      {isLoading ? <div>Loading...</div> : <div>{data?.username}</div>}
    </S.Container>
  );
};

export default User;
