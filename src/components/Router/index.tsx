import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from '../../layouts/RootLayout';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import UserList from '../../pages/UserList';
import NewProblem from '../../pages/NewProblem';
import ProblemList from '../../pages/ProblemList';
import NewContest from '../../pages/NewContest';
import ContestList from '../../pages/ContestList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/new" element={<NewProblem />} />

          <Route path="/contests" element={<ContestList />} />
          <Route path="/contests/new" element={<NewContest />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
