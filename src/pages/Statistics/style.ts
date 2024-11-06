import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface StatChangeProps {
  isPositive: boolean;
}

interface ViewButtonProps {
  isActive: boolean;
}

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

export const ViewButton = styled.button<ViewButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  background: ${({ isActive }) => (isActive ? '#6366f1' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'white' : '#64748b')};
  cursor: pointer;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background: ${({ isActive }) => (isActive ? '#6366f1' : '#f1f5f9')};
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

export const DateSelector = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #1e293b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: #6366f1;
    font-size: 1.2rem;
  }

  &:hover {
    border-color: #6366f1;
    background: #f8fafc;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
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

export const StatChange = styled.div<StatChangeProps>`
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
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

export const ChartContent = styled.div`
  padding: 1.5rem;
  height: 300px;
`;
