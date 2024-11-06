import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

export const Background = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

export const Content = styled.div`
  text-align: center;
  z-index: 1;
  max-width: 600px;
  width: 100%;
`;

export const ErrorCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: #2563eb;

  span {
    font-size: 8rem;
    font-weight: 800;
    line-height: 1;

    @media (max-width: 640px) {
      font-size: 6rem;
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  min-width: 160px;
  cursor: pointer;

  ${({ primary }) =>
    primary &&
    `
    background: #2563eb;
    color: white;
    &:hover {
      background: #1d4ed8;
    }
  `}
  ${({ secondary }) =>
    secondary &&
    `
    background: white;
    color: #1e293b;
    border: 2px solid #e2e8f0;
    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
  `}
    @media (max-width: 640px) {
    width: 100%;
  }
`;
