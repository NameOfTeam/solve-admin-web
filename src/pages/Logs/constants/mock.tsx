import {
  FaBug,
  FaClock,
  FaCloudDownloadAlt,
  FaDatabase,
  FaDesktop,
  FaExclamation,
  FaExclamationTriangle,
  FaGlobe,
  FaKey,
  FaLock,
  FaMobile,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import {
  ApiLog,
  ApiLogData,
  AuthLog,
  AuthLogData,
  LogLevel,
  SecurityLog,
  SecurityLogData,
  SystemLogData,
} from '../types';

export const authLogs: AuthLogData = {
  cards: [
    { title: '일일 로그인', value: '12,345', change: 8.4, icon: <FaSignInAlt /> },
    { title: '신규 가입', value: '234', change: 15.2, icon: <FaUserPlus /> },
    { title: '비밀번호 재설정', value: '56', change: -12.5, icon: <FaKey /> },
    { title: '실패한 로그인', value: '123', change: -5.7, icon: <FaExclamationTriangle /> },
  ],
  loginAttempts: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    success: Math.floor(Math.random() * 500) + 200,
    failure: Math.floor(Math.random() * 50) + 10,
  })),
  deviceStats: [
    { name: '데스크톱', count: 5678, icon: <FaDesktop /> },
    { name: '모바일', count: 4567, icon: <FaMobile /> },
    { name: '태블릿', count: 890, icon: <FaGlobe /> },
  ],
  recentLogs: Array.from({ length: 10 }, (_, i) => ({
    id: `auth-${i}`,
    timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
    type: ['LOGIN', 'REGISTER', 'PASSWORD_RESET', 'LOGOUT'][Math.floor(Math.random() * 4)],
    status: Math.random() > 0.2 ? 'success' : 'failure',
    user: `user${Math.floor(Math.random() * 1000)}`,
    ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    device: ['Windows/Chrome', 'MacOS/Safari', 'iOS/Safari', 'Android/Chrome'][
      Math.floor(Math.random() * 4)
    ],
    location: ['Seoul, KR', 'Tokyo, JP', 'New York, US', 'London, UK'][
      Math.floor(Math.random() * 4)
    ],
  })) as AuthLog[],
};

export const systemLogs: SystemLogData = {
  cards: [
    { title: 'CPU 사용률', value: '45.6%', change: -5.4, icon: <FaServer /> },
    { title: '메모리 사용률', value: '78.9%', change: 12.3, icon: <FaDatabase /> },
    { title: '디스크 사용률', value: '67.8%', change: 3.4, icon: <FaDatabase /> },
    { title: '네트워크 트래픽', value: '234MB/s', change: 8.7, icon: <FaNetworkWired /> },
  ],
  resourceUsage: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    cpu: Math.floor(Math.random() * 40) + 30,
    memory: Math.floor(Math.random() * 30) + 60,
    network: Math.floor(Math.random() * 200) + 100,
  })),
  errorDistribution: [
    { type: '500 Internal', count: 123 },
    { type: '404 Not Found', count: 234 },
    { type: '403 Forbidden', count: 89 },
    { type: '400 Bad Request', count: 167 },
    { type: 'Timeout', count: 78 },
  ],
  recentLogs: Array.from({ length: 10 }, (_, i) => ({
    id: `sys-${i}`,
    timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
    level: ['info', 'warn', 'error'][Math.floor(Math.random() * 3)] as LogLevel,
    service: ['api-server', 'web-server', 'db-server', 'cache-server'][
      Math.floor(Math.random() * 4)
    ],
    message: [
      'High CPU usage detected',
      'Memory usage exceeded threshold',
      'Disk space running low',
      'Network latency increased',
      'Service restarted',
    ][Math.floor(Math.random() * 5)],
    details: {
      value: Math.floor(Math.random() * 100),
      threshold: 80,
      duration: `${Math.floor(Math.random() * 1000)}ms`,
    },
  })),
};

export const securityLogs: SecurityLogData = {
  cards: [
    { title: '의심스러운 접근', value: '45', change: -12.3, icon: <FaExclamationTriangle /> },
    { title: '차단된 IP', value: '123', change: -8.7, icon: <FaShieldAlt /> },
    { title: 'CSRF 시도', value: '12', change: -25.4, icon: <FaLock /> },
    { title: 'XSS 시도', value: '34', change: -15.6, icon: <FaBug /> },
  ],
  attackTypes: [
    { type: 'SQL Injection', count: 234 },
    { type: 'XSS', count: 167 },
    { type: 'CSRF', count: 89 },
    { type: 'Brute Force', count: 145 },
    { type: 'DDoS', count: 56 },
  ],
  recentLogs: Array.from({ length: 10 }, (_, i) => ({
    id: `sec-${i}`,
    timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
    type: ['INTRUSION', 'ATTACK', 'VULNERABILITY', 'ACCESS'][Math.floor(Math.random() * 4)],
    status: 'blocked',
    source: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    target: ['login', 'api', 'admin', 'user'][Math.floor(Math.random() * 4)],
    severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
  })) as SecurityLog[],
};

export const apiLogs: ApiLogData = {
  cards: [
    { title: '총 요청', value: '1.2M', change: 15.4, icon: <FaCloudDownloadAlt /> },
    { title: '평균 응답시간', value: '245ms', change: -8.9, icon: <FaClock /> },
    { title: '에러율', value: '0.12%', change: -12.3, icon: <FaExclamation /> },
    { title: '활성 엔드포인트', value: '34', change: 5.6, icon: <FaServer /> },
  ],
  responseTime: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    time: Math.floor(Math.random() * 300) + 100,
  })),
  endpointStats: [
    { endpoint: '/api/auth', count: 45678, avgTime: 123 },
    { endpoint: '/api/users', count: 34567, avgTime: 98 },
    { endpoint: '/api/posts', count: 23456, avgTime: 145 },
    { endpoint: '/api/comments', count: 12345, avgTime: 87 },
  ],
  recentLogs: Array.from({ length: 10 }, (_, i) => ({
    id: `api-${i}`,
    timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
    method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
    endpoint: ['/api/auth', '/api/users', '/api/posts', '/api/comments'][
      Math.floor(Math.random() * 4)
    ],
    status: [200, 201, 400, 401, 403, 404, 500][Math.floor(Math.random() * 7)],
    duration: Math.floor(Math.random() * 500),
    ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
  })) as ApiLog[],
};
