import {
  FaKey,
  FaServer,
  FaShieldAlt,
  FaDatabase,
  FaNetworkWired,
  FaExclamationTriangle,
  FaSignInAlt,
  FaUserPlus,
  FaClock,
  FaBug,
  FaLock,
  FaCloudDownloadAlt,
  FaExclamation,
} from 'react-icons/fa';
import {
  AuthLogData,
  SystemLogData,
  SecurityLogData,
  ApiLogData,
  AuthLog,
  SystemLog,
  SecurityLog,
  ApiLog,
  LogLevel,
} from '../types';

// 보안 인증 로그 데이터
export const authLogs: AuthLogData = {
  cards: [
    { title: '총 로그인 시도', value: '23,456', change: 12.3, icon: <FaSignInAlt /> },
    { title: '신규 사용자', value: '1,234', change: 15.2, icon: <FaUserPlus /> },
    { title: '비밀번호 변경', value: '456', change: -5.7, icon: <FaKey /> },
    { title: '실패한 시도', value: '89', change: -12.4, icon: <FaExclamationTriangle /> },
  ],
  loginAttempts: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    success: Math.floor(Math.random() * 500) + 200,
    failure: Math.floor(Math.random() * 50) + 10,
  })),
  deviceStats: [
    { name: '데스크톱', count: 12345 },
    { name: '모바일', count: 8765 },
    { name: '태블릿', count: 2345 },
  ],
  recentLogs: Array.from(
    { length: 20 },
    (_, i): AuthLog => ({
      id: `auth-${i}`,
      timestamp: new Date(Date.now() - i * 5 * 60000).toISOString(),
      type: ['LOGIN', 'REGISTER', 'PASSWORD_RESET', 'LOGOUT'][
        Math.floor(Math.random() * 4)
      ] as AuthLog['type'],
      status: Math.random() > 0.2 ? 'success' : 'failure',
      user: `user${Math.floor(Math.random() * 1000)}@example.com`,
      ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      device: ['Windows PC', 'MacBook Pro', 'iPhone 13', 'Galaxy S21'][
        Math.floor(Math.random() * 4)
      ],
      browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
      location: ['서울', '부산', '대전', '인천'][Math.floor(Math.random() * 4)],
    }),
  ),
};

// 시스템 로그 데이터
export const systemLogs: SystemLogData = {
  cards: [
    { title: 'CPU 사용률', value: '67.8%', change: -5.4, icon: <FaServer /> },
    { title: '메모리 사용률', value: '82.3%', change: 3.2, icon: <FaDatabase /> },
    { title: '디스크 I/O', value: '234MB/s', change: 8.9, icon: <FaDatabase /> },
    { title: '네트워크 트래픽', value: '1.2GB/s', change: 15.7, icon: <FaNetworkWired /> },
  ],
  resourceUsage: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    cpu: Math.floor(Math.random() * 40) + 30,
    memory: Math.floor(Math.random() * 30) + 60,
    network: Math.floor(Math.random() * 200) + 100,
  })),
  errorDistribution: [
    { type: '서버 에러', count: 234 },
    { type: '타임아웃', count: 156 },
    { type: '데이터베이스', count: 89 },
    { type: '네트워크', count: 67 },
  ],
  recentLogs: Array.from(
    { length: 20 },
    (_, i): SystemLog => ({
      id: `sys-${i}`,
      timestamp: new Date(Date.now() - i * 5 * 60000).toISOString(),
      level: ['info', 'warn', 'error', 'debug'][Math.floor(Math.random() * 4)] as LogLevel,
      service: ['웹 서버', 'DB 서버', '캐시 서버', 'API 서버'][Math.floor(Math.random() * 4)],
      message: [
        'CPU 사용량이 임계치를 초과했습니다',
        '메모리 사용량이 증가하고 있습니다',
        '디스크 공간이 부족합니다',
        '네트워크 지연이 발생했습니다',
      ][Math.floor(Math.random() * 4)],
      details: {
        value: Math.floor(Math.random() * 100),
        threshold: 80,
        duration: `${Math.floor(Math.random() * 1000)}ms`,
      },
    }),
  ),
};

// 보안 로그 데이터
export const securityLogs: SecurityLogData = {
  cards: [
    { title: '보안 경고', value: '12', change: -25.4, icon: <FaExclamationTriangle /> },
    { title: '차단된 IP', value: '89', change: 12.3, icon: <FaShieldAlt /> },
    { title: '악성 시도', value: '34', change: -8.7, icon: <FaLock /> },
    { title: '취약점 발견', value: '5', change: -15.6, icon: <FaBug /> },
  ],
  attackTypes: [
    { type: 'SQL 인젝션', count: 234 },
    { type: 'XSS', count: 167 },
    { type: '무차별 대입', count: 145 },
    { type: 'DDoS', count: 89 },
  ],
  recentLogs: Array.from(
    { length: 20 },
    (_, i): SecurityLog => ({
      id: `sec-${i}`,
      timestamp: new Date(Date.now() - i * 5 * 60000).toISOString(),
      type: ['INTRUSION', 'ATTACK', 'VULNERABILITY', 'ACCESS'][
        Math.floor(Math.random() * 4)
      ] as SecurityLog['type'],
      status: 'blocked',
      source: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      target: ['/admin', '/api/users', '/login', '/upload'][Math.floor(Math.random() * 4)],
      severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as SecurityLog['severity'],
    }),
  ),
};

// API 로그 데이터
export const apiLogs: ApiLogData = {
  cards: [
    { title: '총 요청', value: '345.2K', change: 18.5, icon: <FaCloudDownloadAlt /> },
    { title: '평균 응답시간', value: '234ms', change: -12.4, icon: <FaClock /> },
    { title: '오류율', value: '0.8%', change: -5.7, icon: <FaExclamation /> },
    { title: '활성 API', value: '156', change: 9.3, icon: <FaServer /> },
  ],
  responseTime: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    time: Math.floor(Math.random() * 300) + 100,
  })),
  endpointStats: [
    { endpoint: '/api/users', count: 12345, avgTime: 234 },
    { endpoint: '/api/posts', count: 8765, avgTime: 189 },
    { endpoint: '/api/comments', count: 5678, avgTime: 156 },
    { endpoint: '/api/auth', count: 4567, avgTime: 123 },
  ],
  recentLogs: Array.from(
    { length: 20 },
    (_, i): ApiLog => ({
      id: `api-${i}`,
      timestamp: new Date(Date.now() - i * 5 * 60000).toISOString(),
      method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)] as ApiLog['method'],
      endpoint: ['/api/users', '/api/posts', '/api/comments', '/api/auth'][
        Math.floor(Math.random() * 4)
      ],
      status: [200, 201, 400, 401, 403, 404, 500][Math.floor(Math.random() * 7)],
      duration: Math.floor(Math.random() * 500),
      ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    }),
  ),
};
