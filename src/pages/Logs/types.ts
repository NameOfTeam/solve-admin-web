export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
export type TimeRange = '1h' | '12h' | '24h' | '7d' | '30d';
export type LogType = 'auth' | 'system' | 'security' | 'api';
export type StatusType =
  | 'success'
  | 'failure'
  | 'warning'
  | 'info'
  | 'error'
  | 'warn'
  | 'high'
  | 'medium'
  | 'low'
  | 'blocked'
  | 'debug';

export interface ButtonProps {
  isActive: boolean;
}

export interface ToggleProps {
  isActive: boolean;
}

export interface BaseLogEntry {
  id: string;
  timestamp: string;
}

export interface AuthLog extends BaseLogEntry {
  type: 'LOGIN' | 'REGISTER' | 'PASSWORD_RESET' | 'LOGOUT';
  status: 'success' | 'failure';
  user: string;
  ip: string;
  device: string;
  browser: string;
  location: string;
}

export interface SystemLog extends BaseLogEntry {
  level: LogLevel;
  service: string;
  message: string;
  details: {
    value: number;
    threshold: number;
    duration: string;
  };
}

export interface SecurityLog extends BaseLogEntry {
  type: 'INTRUSION' | 'ATTACK' | 'VULNERABILITY' | 'ACCESS';
  status: 'blocked';
  source: string;
  target: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ApiLog extends BaseLogEntry {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  duration: number;
  ip: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export interface ChartDataPoint {
  hour: string;

  [key: string]: string | number;
}

export interface FilterState {
  search: string;
  levels: LogLevel[];
  timeRange: TimeRange;
  isRealtime: boolean;
}

export interface LogData {
  cards: StatCard[];
  recentLogs: Array<AuthLog | SystemLog | SecurityLog | ApiLog>;
}

export interface AuthLogData extends LogData {
  loginAttempts: ChartDataPoint[];
  deviceStats: Array<{ name: string; count: number }>;
  recentLogs: AuthLog[];
}

export interface SystemLogData extends LogData {
  resourceUsage: ChartDataPoint[];
  errorDistribution: Array<{ type: string; count: number }>;
  recentLogs: SystemLog[];
}

export interface SecurityLogData extends LogData {
  attackTypes: Array<{ type: string; count: number }>;
  recentLogs: SecurityLog[];
}

export interface ApiLogData extends LogData {
  responseTime: ChartDataPoint[];
  endpointStats: Array<{
    endpoint: string;
    count: number;
    avgTime: number;
  }>;
  recentLogs: ApiLog[];
}
