import { FaServer, FaShieldAlt, FaUserSecret } from 'react-icons/fa';
import { LogLevel, TimeRange } from '../types';

export const COLORS = ['#6366f1', '#3b82f6', '#60a5fa', '#93c5fd', '#818cf8', '#4f46e5'] as const;

export const LOG_LEVELS: LogLevel[] = ['info', 'warn', 'error', 'debug'];

export const TIME_RANGES = [
  { label: '1시간', value: '1h' as TimeRange },
  { label: '12시간', value: '12h' as TimeRange },
  { label: '24시간', value: '24h' as TimeRange },
  { label: '7일', value: '7d' as TimeRange },
  { label: '30일', value: '30d' as TimeRange },
];

export const DEFAULT_FILTER_STATE = {
  search: '',
  levels: ['info', 'warn', 'error'] as LogLevel[],
  timeRange: '24h' as TimeRange,
  isRealtime: true,
};

export const VIEW_OPTIONS = [
  { id: 'auth', label: '인증', icon: FaUserSecret },
  { id: 'system', label: '시스템', icon: FaServer },
  { id: 'security', label: '보안', icon: FaShieldAlt },
  { id: 'api', label: 'API', icon: FaServer },
];

export const STATUS_COLORS = {
  success: '#10b981',
  failure: '#ef4444',
  warning: '#f59e0b',
  info: '#6366f1',
  error: '#ef4444',
  warn: '#f59e0b',
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
} as const;

export const CHART_CONFIG = {
  areaGradient: {
    success: {
      offset1: '5%',
      offset2: '95%',
      color: '#6366f1',
    },
    failure: {
      offset1: '5%',
      offset2: '95%',
      color: '#ef4444',
    },
  },
  grid: {
    strokeDasharray: '3 3',
  },
  defaultTransition: {
    duration: 0.2,
    type: 'spring',
    stiffness: 200,
    damping: 20,
  },
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
