import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaClock, FaFilter, FaSearch, FaSpinner, FaSync, FaTimes } from 'react-icons/fa';
import * as S from './style';
import { CHART_DEFAULTS, LOG_LEVELS, TIME_RANGES, VIEW_OPTIONS } from './constants';
import { apiLogs, authLogs, securityLogs, systemLogs } from './constants/mock';
import {
  ApiLog,
  AuthLog,
  FilterState,
  LogLevel,
  LogType,
  SecurityLog,
  StatCard,
  StatusType,
  SystemLog,
} from './types';

const StatCardComponent = ({ title, value, change, icon }: StatCard) => (
  <S.StatCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={CHART_DEFAULTS.transition}
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (autoRefresh) {
      timer = setInterval(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500); // 모의 로딩
      }, 30000);
    }
    return () => clearInterval(timer);
  }, [autoRefresh]);

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleLevel = (level: LogLevel) => {
    setFilters((prev) => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : ([...prev.levels, level] as FilterState['levels']),
    }));
  };

  const getLogStatus = (log: AuthLog | SecurityLog | ApiLog | SystemLog): StatusType => {
    if ('status' in log && typeof log.status === 'string') return log.status as StatusType;
    if ('level' in log) return log.level;
    if ('status' in log && typeof log.status === 'number') {
      return log.status < 400 ? 'success' : 'error';
    }
    return 'info';
  };

  const getLogMessage = (log: AuthLog | SecurityLog | ApiLog | SystemLog): string => {
    if ('endpoint' in log) {
      return `${log.method} ${log.endpoint} | ${log.status} | ${log.duration}ms`;
    }
    if ('user' in log) {
      return `${log.user} | ${log.device} (${log.browser}) | ${log.location}`;
    }
    if ('source' in log) {
      return `${log.type} | ${log.source} → ${log.target}`;
    }
    if ('message' in log) {
      return `${log.service} | ${log.message}`;
    }
    return '';
  };

  const renderFilters = () => (
    <S.FiltersContainer
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
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
              onClick={() => handleFilterChange('timeRange', value)}
            >
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
              onClick={() => toggleLevel(level)}
            >
              {level.toUpperCase()}
            </S.LevelButton>
          ))}
        </S.LevelSelector>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterLabel>실시간 업데이트</S.FilterLabel>
        <S.ToggleSwitch
          isActive={filters.isRealtime}
          onClick={() => handleFilterChange('isRealtime', !filters.isRealtime)}
        >
          <S.ToggleSlider isActive={filters.isRealtime} />
        </S.ToggleSwitch>
      </S.FilterSection>
    </S.FiltersContainer>
  );

  const renderCharts = () => {
    const logData = {
      auth: authLogs,
      system: systemLogs,
      security: securityLogs,
      api: apiLogs,
    }[currentView];

    if (!logData) return null;

    return (
      <>
        <S.StatGrid>
          {logData.cards.map((card) => (
            <StatCardComponent key={card.title} {...card} />
          ))}
        </S.StatGrid>

        <S.ChartGrid>{/* 각 뷰에 해당하는 차트들... */}</S.ChartGrid>

        <S.LogListCard>
          <S.LogListHeader>
            <S.LogListTitle>
              <FaClock />
              실시간 로그
            </S.LogListTitle>
          </S.LogListHeader>
          <S.LogList>
            {logData.recentLogs.map((log) => (
              <S.LogItem key={log.id} status={getLogStatus(log)}>
                <S.LogTime>{new Date(log.timestamp).toLocaleTimeString()}</S.LogTime>
                <S.LogContent>
                  <S.LogMessage>{getLogMessage(log)}</S.LogMessage>
                </S.LogContent>
                <S.LogStatus status={getLogStatus(log)}>{getLogStatus(log)}</S.LogStatus>
              </S.LogItem>
            ))}
          </S.LogList>
        </S.LogListCard>
      </>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <S.Title>
            로그 <span>모니터링</span>
          </S.Title>
        </motion.div>

        <S.Controls>
          <S.ViewSelector>
            {VIEW_OPTIONS.map((option) => (
              <S.ViewButton
                key={option.id}
                isActive={currentView === option.id}
                onClick={() => setCurrentView(option.id as LogType)}
              >
                <option.icon />
                {option.label}
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
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaSync />}
            </S.ToolButton>
          </S.ToolBar>
        </S.Controls>
      </S.Header>

      <AnimatePresence>{isFilterOpen && renderFilters()}</AnimatePresence>

      <AnimatePresence mode="wait">
        <S.Content {...CHART_DEFAULTS.animation}>{renderCharts()}</S.Content>
      </AnimatePresence>
    </S.Container>
  );
};

export default Logs;
