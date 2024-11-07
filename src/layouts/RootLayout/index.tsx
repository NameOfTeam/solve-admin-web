import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import * as S from './style';

const RootLayout = () => {
  return (
    <S.LayoutContainer>
      <Sidebar />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.LayoutContainer>
  );
};

export default RootLayout;
