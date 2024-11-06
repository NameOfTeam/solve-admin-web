import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrophy,
  FaUsers,
  FaCode,
  FaChartLine,
  FaCalendarAlt,
  FaLightbulb,
  FaUserGraduate,
  FaList,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import DateRangeModal from '../../components/DateRangeModal';
import * as S from './style';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => (
  <S.StatCard whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
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
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  // 샘플 데이터
  const monthlyUsers = [
    { month: '1월', users: 3200 },
    { month: '2월', users: 3800 },
    { month: '3월', users: 4200 },
    { month: '4월', users: 4800 },
    { month: '5월', users: 5100 },
    { month: '6월', users: 5600 },
  ];

  const problemCategories = [
    { name: '알고리즘', value: 35 },
    { name: '자료구조', value: 25 },
    { name: 'DB', value: 20 },
    { name: '네트워크', value: 20 },
  ];

  const contestStats = [
    { month: '1월', participants: 450, submissions: 1200 },
    { month: '2월', participants: 520, submissions: 1400 },
    { month: '3월', participants: 580, submissions: 1600 },
    { month: '4월', participants: 620, submissions: 1800 },
    { month: '5월', participants: 680, submissions: 2000 },
    { month: '6월', participants: 750, submissions: 2200 },
  ];

  const submissionsByHour = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}시`,
    submissions: Math.floor(Math.random() * 500 + 200),
  }));

  const COLORS = ['#6366f1', '#3b82f6', '#60a5fa', '#93c5fd'];

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  const formatDateRange = () => {
    const months = Math.round(
      (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (30 * 24 * 60 * 60 * 1000),
    );
    return `최근 ${months}개월`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <S.Container>
      <S.Header>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          <S.Title>
            통계 <span>현황</span>
          </S.Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          <S.DateSelector
            onClick={() => setIsDateModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <FaCalendarAlt />
            {formatDateRange()}
          </S.DateSelector>
        </motion.div>
      </S.Header>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <S.StatGrid>
          <motion.div variants={itemVariants}>
            <StatCard title="활성 사용자" value="5,600" change={12.5} icon={<FaUsers />} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard title="등록된 문제" value="320" change={8.3} icon={<FaCode />} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard title="진행된 대회" value="24" change={20} icon={<FaTrophy />} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard title="총 제출" value="12,450" change={15.7} icon={<FaChartLine />} />
          </motion.div>
        </S.StatGrid>

        <S.ChartGrid>
          <motion.div variants={itemVariants}>
            <S.ChartCard>
              <S.ChartHeader>
                <S.ChartTitle>
                  <FaUsers />
                  사용자 증가 추이
                </S.ChartTitle>
              </S.ChartHeader>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyUsers}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#6366f1" fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </S.ChartCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <S.ChartCard>
              <S.ChartHeader>
                <S.ChartTitle>
                  <FaList />
                  문제 카테고리
                </S.ChartTitle>
              </S.ChartHeader>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={problemCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                      return (
                        <text
                          x={x}
                          y={y}
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fill="#64748b"
                          fontSize="12">
                          {name} ({(percent * 100).toFixed(0)}%)
                        </text>
                      );
                    }}>
                    {problemCategories.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </S.ChartCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <S.ChartCard>
              <S.ChartHeader>
                <S.ChartTitle>
                  <FaUserGraduate />
                  대회 참여 현황
                </S.ChartTitle>
              </S.ChartHeader>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={contestStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="participants"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="submissions"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </S.ChartCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <S.ChartCard>
              <S.ChartHeader>
                <S.ChartTitle>
                  <FaLightbulb />
                  시간대별 제출
                </S.ChartTitle>
              </S.ChartHeader>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={submissionsByHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="submissions" fill="#6366f1">
                    {submissionsByHour.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`rgba(99, 102, 241, ${0.4 + (index / submissionsByHour.length) * 0.6})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </S.ChartCard>
          </motion.div>
        </S.ChartGrid>
      </motion.div>

      <DateRangeModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onApply={handleDateRangeChange}
        initialStartDate={dateRange.startDate}
        initialEndDate={dateRange.endDate}
      />
    </S.Container>
  );
};

export default Statistics;
