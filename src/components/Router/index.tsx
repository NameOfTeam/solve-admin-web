import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from '../../layouts/RootLayout';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import UserList from '../../pages/UserList';
import NewProblem from '../../pages/NewProblem';
import ProblemList from '../../pages/ProblemList';
import NewContest from '../../pages/NewContest';
import ContestList from '../../pages/ContestList';
import ProblemIdeaList from '../../pages/ProblemIdeaList';
import NewProblemIdea from '../../pages/NewProblemIdea';
import ProblemIdea from '../../pages/ProblemIdea';
import Problem from '../../pages/Problem';
import Contest from '../../pages/Contest';
import Signup from '../../pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/:problemId" element={<Problem />} />
          <Route path="/problems/new" element={<NewProblem />} />

          <Route path="/problems/:problemId/ideas" element={<ProblemIdeaList />} />
          <Route path="/problems/:problemId/ideas/:ideaId" element={<ProblemIdea />} />
          <Route path="/problems/:problemId/ideas/new" element={<NewProblemIdea />} />

          <Route path="/contests" element={<ContestList />} />
          <Route path="/contests/:contestId" element={<Contest />} />
          <Route path="/contests/new" element={<NewContest />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
