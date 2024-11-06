import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const RootLayout = () => {
  return (
    <>
      <Sidebar />

      <main style={{ paddingLeft: '280px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
