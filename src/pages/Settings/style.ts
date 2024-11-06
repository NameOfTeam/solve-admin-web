import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface ToggleProps {
  isActive: boolean;
}

interface ActionButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
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
  align-items: flex-start;
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
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
`;

export const Description = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.1);

    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
    }
  `
      : `
    background: white;
    color: #1e293b;
    border: 2px solid #e2e8f0;

    &:not(:disabled):hover {
      border-color: #6366f1;
      color: #6366f1;
      background: #f8fafc;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }

  svg {
    font-size: 1.1em;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const SectionIcon = styled.div`
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

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

export const SectionDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

export const OptionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const OptionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const OptionLabel = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

export const OptionDescription = styled.div`
  color: #64748b;
  font-size: 0.875rem;
`;

export const Toggle = styled.button<ToggleProps>`
  width: 52px;
  height: 28px;
  padding: 2px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' : '#e2e8f0'};
  transition: background 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ToggleHandle = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
