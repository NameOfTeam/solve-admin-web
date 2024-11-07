import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaClipboardList,
  FaClock,
  FaCode,
  FaLightbulb,
  FaMedal,
  FaTrophy,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa';
import * as S from './style';

const COLORS = ['#6366f1', '#3b82f6', '#60a5fa', '#93c5fd', '#818cf8', '#4f46e5'];

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, delay = 0 }) => (
  <S.StatCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay,
    }}
  >
    <S.StatIcon>{icon}</S.StatIcon>
    <S.StatInfo>
      <S.StatTitle>{title}</S.StatTitle>
      <S.StatValue>{value}</S.StatValue>
      <S.StatChange isPositive={change > 0}>
        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
      </S.StatChange>
    </S.StatInfo>
  </S.StatCard>
);

const Statistics = () => {
  const [currentView, setCurrentView] = useState<'problem' | 'contest' | 'submission'>('problem');

  // Mock data for problem statistics
  const problemStats = {
    cards: [
      { title: '전체 문제', value: '1,234', change: 15.2, icon: <FaCode /> },
      { title: '평균 정답률', value: '67.8%', change: 5.4, icon: <FaLightbulb /> },
      { title: '오늘 제출된 풀이', value: '2,456', change: 12.3, icon: <FaClipboardList /> },
      { title: '최근 추가된 문제', value: '45', change: 8.7, icon: <FaChartLine /> },
    ],
    categoryData: [
      { name: '알고리즘', count: 320 },
      { name: '자료구조', count: 180 },
      { name: 'DB', count: 150 },
      { name: '네트워크', count: 120 },
      { name: '운영체제', count: 80 },
    ],
    difficultyData: [
      { level: '입문', count: 150 },
      { level: '쉬움', count: 250 },
      { level: '보통', count: 280 },
      { level: '어려움', count: 120 },
      { level: '매우 어려움', count: 50 },
    ],
    solveTimeData: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}`,
      count: Math.floor(Math.random() * 1000) + 200,
    })),
  };

  // Mock data for contest statistics
  const contestStats = {
    cards: [
      { title: '진행중인 대회', value: '3', change: 50.0, icon: <FaTrophy /> },
      { title: '전체 참가자', value: '12,345', change: 25.4, icon: <FaUsers /> },
      { title: '이번달 대회수', value: '8', change: 14.2, icon: <FaMedal /> },
      { title: '평균 참가율', value: '76.5%', change: 9.8, icon: <FaUserGraduate /> },
    ],
    participationData: [
      { month: '1월', participants: 450, submissions: 1200 },
      { month: '2월', participants: 520, submissions: 1400 },
      { month: '3월', participants: 580, submissions: 1600 },
      { month: '4월', participants: 620, submissions: 1800 },
      { month: '5월', participants: 680, submissions: 2000 },
      { month: '6월', participants: 750, submissions: 2200 },
    ],
  };

  // Mock data for submission statistics
  const submissionStats = {
    cards: [
      { title: '전체 제출', value: '234,567', change: 18.5, icon: <FaChartLine /> },
      { title: '정답률', value: '45.6%', change: 7.2, icon: <FaChartPie /> },
      { title: '일일 평균 제출', value: '3,456', change: 12.8, icon: <FaChartBar /> },
      { title: '평균 응답시간', value: '2.3초', change: -15.4, icon: <FaClock /> },
    ],
    submissionData: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}시`,
      accepted: Math.floor(Math.random() * 500) + 100,
      wrong: Math.floor(Math.random() * 300) + 50,
    })),
  };

  const renderProblemCharts = () => (
    <>
      <S.ChartGrid>
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>
              <FaChartPie /> 카테고리별 분포
            </S.ChartTitle>
          </S.ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={problemStats.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="count"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {problemStats.categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </S.ChartCard>

        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>
              <FaChartBar /> 난이도별 문제 수
            </S.ChartTitle>
          </S.ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={problemStats.difficultyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1">
                {problemStats.difficultyData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`rgba(99, 102, 241, ${0.4 + (index / problemStats.difficultyData.length) * 0.6})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </S.ChartCard>

        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>
              <FaClock /> 시간대별 문제 풀이
            </S.ChartTitle>
          </S.ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={problemStats.solveTimeData}>
              <defs>
                <linearGradient id="colorSolve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorSolve)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </S.ChartCard>
      </S.ChartGrid>
    </>
  );

  const renderContestCharts = () => (
    <>
      <S.ChartGrid>
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>
              <FaChartLine /> 월별 참가자 및 제출 현황
            </S.ChartTitle>
          </S.ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contestStats.participationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="participants"
                name="참가자"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: '#6366f1' }}
              />
              <Line
                type="monotone"
                dataKey="submissions"
                name="제출"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </S.ChartCard>
      </S.ChartGrid>
    </>
  );

  const renderSubmissionCharts = () => (
    <>
      <S.ChartGrid>
        <S.ChartCard>
          <S.ChartHeader>
            <S.ChartTitle>
              <FaChartBar /> 시간대별 제출 현황
            </S.ChartTitle>
          </S.ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submissionStats.submissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accepted" name="정답" stackId="a" fill="#6366f1" />
              <Bar dataKey="wrong" name="오답" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </S.ChartCard>
      </S.ChartGrid>
    </>
  );

  return (
    <S.Container>
      <S.Header>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <S.Title>
            통계 <span>현황</span>
          </S.Title>
        </motion.div>

        <S.Controls>
          <S.ViewSelector>
            <S.ViewButton
              isActive={currentView === 'problem'}
              onClick={() => setCurrentView('problem')}
            >
              <FaCode /> 문제
            </S.ViewButton>
            <S.ViewButton
              isActive={currentView === 'contest'}
              onClick={() => setCurrentView('contest')}
            >
              <FaTrophy /> 대회
            </S.ViewButton>
            <S.ViewButton
              isActive={currentView === 'submission'}
              onClick={() => setCurrentView('submission')}
            >
              <FaChartLine /> 제출
            </S.ViewButton>
          </S.ViewSelector>
          <S.DateSelector>
            <FaCalendarAlt /> 최근 6개월
          </S.DateSelector>
        </S.Controls>
      </S.Header>

      <AnimatePresence mode="wait">
        <S.Content
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <S.StatGrid>
            {(currentView === 'problem'
              ? problemStats.cards
              : currentView === 'contest'
                ? contestStats.cards
                : submissionStats.cards
            ).map((card, index) => (
              <StatCard key={card.title} {...card} delay={index * 0.1} />
            ))}
          </S.StatGrid>

          {currentView === 'problem' && renderProblemCharts()}
          {currentView === 'contest' && renderContestCharts()}
          {currentView === 'submission' && renderSubmissionCharts()}
        </S.Content>
      </AnimatePresence>
    </S.Container>
  );
};

export default Statistics;
