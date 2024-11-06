import { FaServer, FaShieldAlt, FaUserSecret, FaGlobe } from 'react-icons/fa';
import { LogLevel, TimeRange } from '../types';

export const COLORS = [
  '#6366f1', // 인디고
  '#3b82f6', // 블루
  '#60a5fa', // 라이트 블루
  '#93c5fd', // 더 라이트 블루
  '#818cf8', // 인디고 라이트
  '#4f46e5', // 딥 인디고
] as const;

export const LOG_LEVELS: LogLevel[] = ['info', 'warn', 'error', 'debug'];

export const TIME_RANGES = [
  { label: '1시간', value: '1h' as TimeRange },
  { label: '12시간', value: '12h' as TimeRange },
  { label: '24시간', value: '24h' as TimeRange },
  { label: '7일', value: '7d' as TimeRange },
  { label: '30일', value: '30d' as TimeRange },
] as const;

export const VIEW_OPTIONS = [
  { id: 'auth', label: '인증', icon: FaUserSecret },
  { id: 'system', label: '시스템', icon: FaServer },
  { id: 'security', label: '보안', icon: FaShieldAlt },
  { id: 'api', label: 'API', icon: FaGlobe },
] as const;

export const STATUS_COLORS = {
  success: '#10b981', // 그린
  failure: '#ef4444', // 레드
  warning: '#f59e0b', // 옐로우
  info: '#6366f1', // 인디고
  error: '#ef4444', // 레드
  warn: '#f59e0b', // 옐로우
  high: '#ef4444', // 레드
  medium: '#f59e0b', // 옐로우
  low: '#10b981', // 그린
  blocked: '#ef4444', // 레드
  debug: '#6366f1', // 인디고
} as const;

export const CHART_DEFAULTS = {
  gridStyle: {
    strokeDasharray: '3 3',
  },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
  gradients: {
    success: {
      start: 'rgba(99, 102, 241, 0.8)',
      end: 'rgba(99, 102, 241, 0)',
    },
    failure: {
      start: 'rgba(239, 68, 68, 0.8)',
      end: 'rgba(239, 68, 68, 0)',
    },
  },
  animation: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    duration: 0.2,
  },
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const DEFAULT_FILTERS = {
  search: '',
  levels: ['info', 'warn', 'error'] as LogLevel[],
  timeRange: '24h' as TimeRange,
  isRealtime: true,
} as const;
