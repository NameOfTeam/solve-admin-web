import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from '../../layouts/RootLayout';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import UserList from '../../pages/UserList';
import NewProblem from '../../pages/NewProblem';
import ProblemList from '../../pages/ProblemList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/new" element={<NewProblem />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
