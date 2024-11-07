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
import Settings from '../../pages/Settings';
import NotFound from '../../pages/NotFound';
import Statistics from '../../pages/Statistics';
import User from '../../pages/User';
import EditUser from '../../pages/EditUser';
import Logs from '../../pages/Logs';
import WorkbookList from '../../pages/WorkbookList';
import NewWorkbook from '../../pages/NewWorkbook';
import Workbook from '../../pages/Workbook';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/users/:userId/edit" element={<EditUser />} />

          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/:problemId" element={<Problem />} />
          <Route path="/problems/new" element={<NewProblem />} />

          <Route path="/problems/:problemId/ideas" element={<ProblemIdeaList />} />
          <Route path="/problems/:problemId/ideas/:ideaId" element={<ProblemIdea />} />
          <Route path="/problems/:problemId/ideas/new" element={<NewProblemIdea />} />

          <Route path="/contests" element={<ContestList />} />
          <Route path="/contests/:contestId" element={<Contest />} />
          <Route path="/contests/new" element={<NewContest />} />

          <Route path="/workbooks" element={<WorkbookList />} />
          <Route path="/workbooks/:workbookId" element={<Workbook />} />
          <Route path="/workbooks/new" element={<NewWorkbook />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />

          <Route path="/logs" element={<Logs />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
