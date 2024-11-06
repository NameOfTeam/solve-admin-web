import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { AnimatePresence } from 'framer-motion';
import {
  FaCode,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
  FaLightbulb,
  FaClipboardList,
  FaClock,
  FaUsers,
  FaChartPie,
  FaChartBar,
  FaUserGraduate,
  FaMedal,
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
      stiffness: 200,
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

type StatisticsView = 'problem' | 'contest' | 'submission';

const Statistics = () => {
  const [currentView, setCurrentView] = useState<StatisticsView>('problem');

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
    attemptsByDifficulty: [
      { level: '입문', attempts: 2.3 },
      { level: '쉬움', attempts: 4.1 },
      { level: '보통', attempts: 7.5 },
      { level: '어려움', attempts: 12.8 },
      { level: '매우 어려움', attempts: 18.2 },
    ],
    languageData: [
      { name: 'Python', count: 2345 },
      { name: 'Java', count: 1567 },
      { name: 'C++', count: 1234 },
      { name: 'JavaScript', count: 890 },
      { name: 'Go', count: 456 },
    ],
    tagData: [
      { name: '동적계획법', count: 234 },
      { name: '그래프', count: 189 },
      { name: '정렬', count: 167 },
      { name: '이진탐색', count: 145 },
      { name: '문자열', count: 123 },
      { name: '구현', count: 112 },
    ],
  };

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
    rankDistribution: [
      { name: '플래티넘', count: 234 },
      { name: '골드', count: 567 },
      { name: '실버', count: 1234 },
      { name: '브론즈', count: 2345 },
    ],
    contestScores: [
      { name: '대회1', averageScore: 75 },
      { name: '대회2', averageScore: 68 },
      { name: '대회3', averageScore: 82 },
      { name: '대회4', averageScore: 71 },
      { name: '대회5', averageScore: 79 },
    ],
    hourlyParticipation: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}:00`,
      participants: Math.floor(Math.random() * 200) + 100,
    })),
    problemSuccess: [
      { problem: '문제 A', successRate: 85 },
      { problem: '문제 B', successRate: 67 },
      { problem: '문제 C', successRate: 45 },
      { problem: '문제 D', successRate: 23 },
      { problem: '문제 E', successRate: 12 },
    ],
    topRankers: [
      { month: '1월', gold: 12, silver: 24, bronze: 36 },
      { month: '2월', gold: 15, silver: 28, bronze: 42 },
      { month: '3월', gold: 18, silver: 32, bronze: 48 },
      { month: '4월', gold: 14, silver: 26, bronze: 38 },
      { month: '5월', gold: 16, silver: 30, bronze: 44 },
      { month: '6월', gold: 20, silver: 35, bronze: 50 },
    ],
  };

  const submissionStats = {
    cards: [
      { title: '전체 제출', value: '234,567', change: 18.5, icon: <FaChartLine /> },
      { title: '정답률', value: '45.6%', change: 7.2, icon: <FaChartPie /> },
      { title: '일일 평균 제출', value: '3,456', change: 12.8, icon: <FaChartBar /> },
      { title: '평균 응답시간', value: '2.3초', change: -15.4, icon: <FaClock /> },
    ],
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}시`,
      accepted: Math.floor(Math.random() * 500) + 100,
      wrong: Math.floor(Math.random() * 300) + 50,
    })),
    weeklyData: [
      { day: '월', total: 2345, accepted: 1234 },
      { day: '화', total: 2567, accepted: 1345 },
      { day: '수', total: 2789, accepted: 1456 },
      { day: '목', total: 2456, accepted: 1234 },
      { day: '금', total: 2890, accepted: 1567 },
      { day: '토', total: 1890, accepted: 987 },
      { day: '일', total: 1567, accepted: 789 },
    ],
    languageData: [
      { name: 'Python', count: 4500 },
      { name: 'Java', count: 3200 },
      { name: 'C++', count: 2800 },
      { name: 'JavaScript', count: 1900 },
      { name: 'Go', count: 800 },
      { name: '기타', count: 500 },
    ],
    runtimeData: [
      { range: '0-100ms', count: 3456 },
      { range: '100-200ms', count: 2345 },
      { range: '200-300ms', count: 1234 },
      { range: '300-400ms', count: 890 },
      { range: '400-500ms', count: 567 },
      { range: '500ms+', count: 234 },
    ],
    errorTypes: [
      { type: '런타임 에러', count: 1234 },
      { type: '시간 초과', count: 890 },
      { type: '메모리 초과', count: 567 },
      { type: '컴파일 에러', count: 456 },
      { type: '잘못된 출력 형식', count: 345 },
      { type: '기타', count: 123 },
    ],
    memoryUsage: [
      { range: '0-50MB', count: 2345 },
      { range: '50-100MB', count: 1567 },
      { range: '100-150MB', count: 890 },
      { range: '150-200MB', count: 567 },
      { range: '200MB+', count: 234 },
    ],
  };

  const renderContent = () => {
    switch (currentView) {
      case 'problem':
        return (
          <>
            <S.StatGrid>
              {problemStats.cards.map((card, index) => (
                <StatCard key={card.title} {...card} delay={index * 0.1} />
              ))}
            </S.StatGrid>
            <S.ChartGrid>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartPie />
                    카테고리별 분포
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
                    <FaChartBar />
                    난이도별 분포
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
                    <FaClock />
                    시간대별 문제 풀이 현황
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

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartLine />
                    난이도별 평균 시도 횟수
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={problemStats.attemptsByDifficulty}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="attempts"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#6366f1' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaCode />
                    언어별 사용 현황
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={problemStats.languageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {problemStats.languageData.map((_, index) => (
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
                    <FaChartBar />
                    태그별 문제 수
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={problemStats.tagData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </S.ChartGrid>
          </>
        );

      case 'contest':
        return (
          <>
            <S.StatGrid>
              {contestStats.cards.map((card, index) => (
                <StatCard key={card.title} {...card} delay={index * 0.1} />
              ))}
            </S.StatGrid>
            <S.ChartGrid>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartLine />
                    월별 대회 참가 추이
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={contestStats.participationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="participants"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#6366f1' }}
                      name="참가자"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="submissions"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                      name="제출"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaUsers />
                    참가자 등급별 분포
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contestStats.rankDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {contestStats.rankDistribution.map((_, index) => (
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
                    <FaChartBar />
                    대회별 평균 점수
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contestStats.contestScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="averageScore" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaClock />
                    시간대별 참가자 수
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={contestStats.hourlyParticipation}>
                    <defs>
                      <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
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
                      dataKey="participants"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorParticipants)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartLine />
                    문제별 정답률
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contestStats.problemSuccess} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="problem" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="successRate" fill="#6366f1">
                      {contestStats.problemSuccess.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.successRate > 50 ? '#6366f1' : '#ef4444'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaTrophy />
                    상위 랭커 분포
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={contestStats.topRankers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="gold"
                      stroke="#ffd700"
                      strokeWidth={2}
                      name="금메달"
                    />
                    <Line
                      type="monotone"
                      dataKey="silver"
                      stroke="#c0c0c0"
                      strokeWidth={2}
                      name="은메달"
                    />
                    <Line
                      type="monotone"
                      dataKey="bronze"
                      stroke="#cd7f32"
                      strokeWidth={2}
                      name="동메달"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </S.ChartGrid>
          </>
        );

      case 'submission':
        return (
          <>
            <S.StatGrid>
              {submissionStats.cards.map((card, index) => (
                <StatCard key={card.title} {...card} delay={index * 0.1} />
              ))}
            </S.StatGrid>
            <S.ChartGrid>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartBar />
                    시간대별 제출 현황
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionStats.hourlyData}>
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

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartLine />
                    주간 제출 추이
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={submissionStats.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="전체 제출"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#6366f1' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accepted"
                      name="정답"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaCode />
                    언어별 제출 비율
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={submissionStats.languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {submissionStats.languageData.map((_, index) => (
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
                    <FaClock />
                    실행 시간 분포
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={submissionStats.runtimeData}>
                    <defs>
                      <linearGradient id="colorRuntime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorRuntime)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartBar />
                    오답 유형 분석
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionStats.errorTypes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ef4444">
                      {submissionStats.errorTypes.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`rgba(239, 68, 68, ${0.4 + (index / submissionStats.errorTypes.length) * 0.6})`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaChartLine />
                    메모리 사용량 추이
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={submissionStats.memoryUsage}>
                    <defs>
                      <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorMemory)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </S.ChartGrid>
          </>
        );
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          통계 <span>현황</span>
        </S.Title>
        <S.Controls>
          <S.ViewSelector>
            <S.ViewButton
              isActive={currentView === 'problem'}
              onClick={() => setCurrentView('problem')}
            >
              <FaCode />
              문제
            </S.ViewButton>
            <S.ViewButton
              isActive={currentView === 'contest'}
              onClick={() => setCurrentView('contest')}
            >
              <FaTrophy />
              대회
            </S.ViewButton>
            <S.ViewButton
              isActive={currentView === 'submission'}
              onClick={() => setCurrentView('submission')}
            >
              <FaChartLine />
              제출
            </S.ViewButton>
          </S.ViewSelector>
          <S.DateSelector>
            <FaCalendarAlt />
            최근 6개월
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
          {renderContent()}
        </S.Content>
      </AnimatePresence>
    </S.Container>
  );
};

export default Statistics;
