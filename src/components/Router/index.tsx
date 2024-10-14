import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from '../../layouts/RootLayout';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import UserList from '../../pages/UserList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
