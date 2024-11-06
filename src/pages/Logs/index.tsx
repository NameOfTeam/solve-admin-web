import { useState, useEffect } from 'react';
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
  Area,
  AreaChart,
  Legend,
} from 'recharts';
import { AnimatePresence } from 'framer-motion';
import * as S from './style';
import {
  LogType,
  LogLevel,
  TimeRange,
  AuthLog,
  SecurityLog,
  ApiLog,
  StatusType,
  SystemLog,
} from './types';
import { COLORS, LOG_LEVELS, TIME_RANGES } from './constants';
import {
  FaClock,
  FaDesktop,
  FaExclamationTriangle,
  FaFilter,
  FaSearch,
  FaServer,
  FaShieldAlt,
  FaSignInAlt,
  FaSync,
  FaTimes,
  FaUserSecret,
} from 'react-icons/fa';
import { apiLogs, authLogs, securityLogs, systemLogs } from './constants/mock';

interface FilterState {
  search: string;
  levels: LogLevel[];
  timeRange: TimeRange;
  isRealtime: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <S.StatCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}>
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

const Logs = () => {
  const [currentView, setCurrentView] = useState<LogType>('auth');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    levels: ['info', 'warn', 'error'],
    timeRange: '24h',
    isRealtime: true,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (autoRefresh) {
      interval = setInterval(() => {
        // Add real-time update logic here
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleLevel = (level: LogLevel) => {
    setFilters((prev) => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : [...prev.levels, level],
    }));
  };

  const renderFilters = () => (
    <S.FiltersContainer
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
      <S.FiltersHeader>
        <S.FiltersTitle>필터 설정</S.FiltersTitle>
        <S.CloseButton isActive={false} onClick={() => setIsFilterOpen(false)}>
          <FaTimes />
        </S.CloseButton>
      </S.FiltersHeader>

      <S.FilterSection>
        <S.FilterLabel>시간 범위</S.FilterLabel>
        <S.TimeRangeSelector>
          {TIME_RANGES.map(({ label, value }) => (
            <S.TimeRangeButton
              key={value}
              isActive={filters.timeRange === value}
              onClick={() => handleFilterChange('timeRange', value)}>
              {label}
            </S.TimeRangeButton>
          ))}
        </S.TimeRangeSelector>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterLabel>로그 레벨</S.FilterLabel>
        <S.LevelSelector>
          {LOG_LEVELS.map((level) => (
            <S.LevelButton
              key={level}
              isActive={filters.levels.includes(level)}
              level={level}
              onClick={() => toggleLevel(level)}>
              {level.toUpperCase()}
            </S.LevelButton>
          ))}
        </S.LevelSelector>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterLabel>실시간 업데이트</S.FilterLabel>
        <S.ToggleSwitch
          isActive={filters.isRealtime}
          onClick={() => handleFilterChange('isRealtime', !filters.isRealtime)}>
          <S.ToggleSlider isActive={filters.isRealtime} />
        </S.ToggleSwitch>
      </S.FilterSection>
    </S.FiltersContainer>
  );

  const getLogStatus = (log: AuthLog | SecurityLog | ApiLog | SystemLog): StatusType => {
    if ('status' in log && typeof log.status === 'string') {
      return log.status as StatusType;
    }
    if ('level' in log) {
      return log.level;
    }
    if ('status' in log && typeof log.status === 'number') {
      return (log.status < 400 ? 'success' : 'error') as StatusType;
    }
    return 'info';
  };

  const getLogMessage = (log: AuthLog | SecurityLog | ApiLog | SystemLog): string => {
    if ('endpoint' in log) {
      return `${log.endpoint} | Status: ${log.status} | Duration: ${log.duration}ms`;
    }
    if ('user' in log) {
      return `User: ${log.user} | IP: ${log.ip} | Device: ${log.device}`;
    }
    if ('source' in log) {
      return `Source: ${log.source} | Target: ${log.target}`;
    }
    if ('message' in log) {
      return log.message;
    }
    return '';
  };

  const renderContent = () => {
    const logsData = {
      auth: authLogs,
      system: systemLogs,
      security: securityLogs,
      api: apiLogs,
    }[currentView];

    if (!logsData) return null;

    const { cards, recentLogs } = logsData;

    return (
      <>
        <S.StatGrid>
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </S.StatGrid>

        <S.ChartGrid>
          {currentView === 'auth' && (
            <>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaSignInAlt />
                    시간대별 로그인 시도
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={authLogs.loginAttempts}>
                    <defs>
                      <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorFailure" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="success"
                      name="성공"
                      stroke="#6366f1"
                      fill="url(#colorSuccess)"
                    />
                    <Area
                      type="monotone"
                      dataKey="failure"
                      name="실패"
                      stroke="#ef4444"
                      fill="url(#colorFailure)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaDesktop />
                    디바이스 분포
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={authLogs.deviceStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {authLogs.deviceStats.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </>
          )}

          {currentView === 'system' && (
            <>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaServer />
                    시스템 리소스 사용량
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemLogs.resourceUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cpu"
                      name="CPU (%)"
                      stroke="#6366f1"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="memory"
                      name="Memory (%)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="network"
                      name="Network (MB/s)"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaExclamationTriangle />
                    에러 분포
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={systemLogs.errorDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}>
                      {systemLogs.errorDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </>
          )}

          {currentView === 'security' && (
            <>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaShieldAlt />
                    공격 유형 분포
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={securityLogs.attackTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}>
                      {securityLogs.attackTypes.map((_, index) => (
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
                    <FaExclamationTriangle />
                    시간대별 보안 이벤트
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Array.from({ length: 24 }, (_, i) => ({
                      hour: `${String(i).padStart(2, '0')}:00`,
                      high: Math.floor(Math.random() * 10),
                      medium: Math.floor(Math.random() * 20),
                      low: Math.floor(Math.random() * 30),
                    }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="high" name="높은 위험도" stackId="a" fill="#ef4444" />
                    <Bar dataKey="medium" name="중간 위험도" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="low" name="낮은 위험도" stackId="a" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </>
          )}

          {currentView === 'api' && (
            <>
              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaClock />
                    API 응답 시간 추이
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={apiLogs.responseTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="time"
                      name="응답 시간 (ms)"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartCard>

              <S.ChartCard>
                <S.ChartHeader>
                  <S.ChartTitle>
                    <FaServer />
                    엔드포인트별 요청 통계
                  </S.ChartTitle>
                </S.ChartHeader>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={apiLogs.endpointStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="endpoint" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="요청 수" fill="#6366f1" />
                    <Bar dataKey="avgTime" name="평균 응답시간 (ms)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartCard>
            </>
          )}

          <S.LogListCard>
            <S.LogListHeader>
              <S.LogListTitle>
                <FaUserSecret />
                최근 로그
              </S.LogListTitle>
            </S.LogListHeader>
            <S.LogList>
              {recentLogs.map((log) => (
                <S.LogItem key={log.id} status={getLogStatus(log)}>
                  <S.LogTime>{new Date(log.timestamp).toLocaleString()}</S.LogTime>
                  <S.LogContent>
                    <S.LogType>
                      {'type' in log
                        ? log.type
                        : 'method' in log
                          ? log.method
                          : 'service' in log
                            ? log.service
                            : ''}
                    </S.LogType>
                    <S.LogMessage>{getLogMessage(log)}</S.LogMessage>
                  </S.LogContent>
                  <S.LogStatus status={getLogStatus(log)}>{getLogStatus(log)}</S.LogStatus>
                </S.LogItem>
              ))}
            </S.LogList>
          </S.LogListCard>
        </S.ChartGrid>
      </>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          로그 <span>모니터링</span>
        </S.Title>

        <S.Controls>
          <S.ViewSelector>
            {[
              { id: 'auth', label: '인증', icon: <FaUserSecret /> },
              { id: 'system', label: '시스템', icon: <FaServer /> },
              { id: 'security', label: '보안', icon: <FaShieldAlt /> },
              { id: 'api', label: 'API', icon: <FaServer /> },
            ].map((view) => (
              <S.ViewButton
                key={view.id}
                isActive={currentView === view.id}
                onClick={() => setCurrentView(view.id as LogType)}>
                {view.icon} {view.label}
              </S.ViewButton>
            ))}
          </S.ViewSelector>

          <S.ToolBar>
            <S.SearchForm onSubmit={(e) => e.preventDefault()}>
              <S.SearchInput
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="로그 검색..."
              />
              <S.SearchButton>
                <FaSearch />
              </S.SearchButton>
            </S.SearchForm>

            <S.ToolButton isActive={false} onClick={() => setIsFilterOpen(true)}>
              <FaFilter />
            </S.ToolButton>
            <S.ToolButton isActive={autoRefresh} onClick={() => setAutoRefresh(!autoRefresh)}>
              <FaSync />
            </S.ToolButton>
          </S.ToolBar>
        </S.Controls>
      </S.Header>

      <AnimatePresence>{isFilterOpen && renderFilters()}</AnimatePresence>

      <AnimatePresence mode="wait">
        <S.Content
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}>
          {renderContent()}
        </S.Content>
      </AnimatePresence>
    </S.Container>
  );
};

export default Logs;
