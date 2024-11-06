import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

interface ToggleProps {
  isActive: boolean;
}

interface ActionButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Container = styled(motion.div)`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  ${({ variant }) =>
    variant === 'primary'
      ? css`
          background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
          color: white;
          &:not(:disabled):hover {
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
          }
        `
      : css`
          background: white;
          color: #1e293b;
          border: 2px solid #e2e8f0;
          &:not(:disabled):hover {
            background: #f8fafc;
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    flex: 1;
    justify-content: center;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 1.25rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
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
  padding: 0.75rem;
  border-radius: 8px;
  background: #f8fafc;
`;

export const OptionLabel = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

export const Toggle = styled.div<ToggleProps>`
  width: 48px;
  height: 26px;
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' : '#e2e8f0'};
  border-radius: 13px;
  padding: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
`;

export const ToggleHandle = styled(motion.div)`
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
