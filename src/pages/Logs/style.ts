import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ButtonProps, StatusType, ToggleProps } from './types';

const getLevelColor = (level: StatusType) => {
  const colors = {
    info: '#6366f1', // 인디고
    warn: '#f59e0b', // 황색
    error: '#ef4444', // 적색
    debug: '#10b981', // 초록
    high: '#ef4444', // 적색
    medium: '#f59e0b', // 황색
    low: '#10b981', // 초록
    success: '#10b981', // 초록
    failure: '#ef4444', // 적색
    blocked: '#ef4444', // 적색
  } as {
    [key in StatusType]: string;
  };
  return colors[level] || '#6366f1';
};

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 4rem;
  background-color: #f8fafc;
  min-height: 100vh;

  @media (max-width: 1536px) {
    max-width: 1280px;
    padding: 2.5rem 3rem;
  }

  @media (max-width: 1280px) {
    max-width: 1024px;
    padding: 2rem 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    border-radius: 2px;
  }

  span {
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
`;

export const ViewSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ViewButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? '#6366f1' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'white' : '#64748b')};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${({ isActive }) => (isActive ? '#6366f1' : '#f1f5f9')};
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

export const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchForm = styled.form`
  position: relative;
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6366f1;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`;

export const ToolButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${({ isActive }) => (isActive ? '#6366f1' : '#e2e8f0')};
  background: white;
  color: ${({ isActive }) => (isActive ? '#6366f1' : '#64748b')};
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    &::before {
      transform: scaleX(1);
    }
  }
`;

export const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatTitle = styled.div`
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.div`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const StatChange = styled.div<{ isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ isPositive }) => (isPositive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)')};
  color: ${({ isPositive }) => (isPositive ? '#059669' : '#dc2626')};
`;

// ... (앞의 스타일 컴포넌트들에 이어서)

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const ChartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(59, 130, 246, 0.05));
`;

export const ChartTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #6366f1;
    font-size: 1.2rem;
  }
`;

export const FiltersContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  z-index: 50;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const FiltersTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
`;

export const CloseButton = styled.button<ButtonProps>`
  color: #64748b;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

export const FilterLabel = styled.div`
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.75rem;
`;

export const TimeRangeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export const TimeRangeButton = styled.button<ButtonProps>`
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  border: 1px solid ${({ isActive }) => (isActive ? '#6366f1' : '#e2e8f0')};
  background: ${({ isActive }) => (isActive ? '#6366f1' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : '#64748b')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
    color: ${({ isActive }) => (isActive ? 'white' : '#6366f1')};
  }
`;

export const LevelSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const LevelButton = styled.button<ButtonProps & { level: string }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${({ isActive, level }) => (isActive ? getLevelColor(level as StatusType) : 'white')};
  color: ${({ isActive, level }) => (isActive ? 'white' : getLevelColor(level as StatusType))};
  border: 1px solid ${({ level }) => getLevelColor(level as StatusType)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ToggleSwitch = styled.button<ToggleProps>`
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background: ${({ isActive }) => (isActive ? '#6366f1' : '#e2e8f0')};
  position: relative;
  padding: 2px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
`;

export const ToggleSlider = styled.div<ToggleProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  transition: all 0.2s;
  transform: translateX(${({ isActive }) => (isActive ? '24px' : '0')});
`;

export const LogListCard = styled.div`
  grid-column: 1 / -1;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const LogListHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(59, 130, 246, 0.05));
`;

export const LogListTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #6366f1;
  }
`;

export const LogList = styled.div`
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

export const LogItem = styled.div<{ status: StatusType }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
  }
`;

export const LogTime = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  min-width: 100px;
`;

export const LogContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LogMessage = styled.div`
  color: #1e293b;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LogStatus = styled.div<{ status: StatusType }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ status }) =>
    `rgba(${getLevelColor(status)
      .slice(1)
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16))
      .join(', ')}, 0.1)`};
  color: ${({ status }) => getLevelColor(status)};
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 40;
`;
