import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
    background: #f1f5f9;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const EditButton = styled(ActionButton)`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  }
`;

export const DeleteButton = styled(ActionButton)`
  background: white;
  color: #ef4444;
  border: 1px solid #fecaca;

  &:hover {
    background: #fef2f2;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(239, 68, 68, 0.1);
  }
`;

export const Content = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TitleSection = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(59, 130, 246, 0.05));
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: #64748b;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
`;

export const ProblemSection = styled.section`
  padding: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProblemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #94a3b8;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const ProblemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const ProblemNumber = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  border-radius: 8px;
`;

export const ProblemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

export const ProblemMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.875rem;
`;

export const PreviewButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
    color: #3b82f6;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;
  gap: 1rem;

  span {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const SpinnerIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;

// Icons
export const BackIcon = styled.div`
  width: 20px;
  height: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

export const EditIcon = styled.div`
  width: 18px;
  height: 18px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 2px;
    background: currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border: 2px solid currentColor;
    border-radius: 1px;
    top: 2px;
    left: 2px;
    transform: rotate(45deg);
  }
`;

export const DeleteIcon = styled.div`
  width: 18px;
  height: 18px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 18px;
    background: currentColor;
    left: 50%;
    top: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const UserIcon = styled.div`
  width: 18px;
  height: 18px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid currentColor;
    border-radius: 50%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 8px;
    border: 2px solid currentColor;
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const TimeIcon = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 2px;
    background: currentColor;
    top: 50%;
    left: 50%;
    transform-origin: left;
    transform: translateY(-50%);
  }
`;

export const ProblemIcon = styled.div`
  width: 18px;
  height: 18px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 18px;
    border: 2px solid currentColor;
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background: currentColor;
    left: 4px;
    top: 6px;
    box-shadow: 0 4px 0 currentColor;
  }
`;

export const PreviewIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
