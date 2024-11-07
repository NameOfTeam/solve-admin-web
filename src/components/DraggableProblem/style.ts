import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  display: flex;
  align-items: stretch;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: move;

  &:hover {
    border-color: #94a3b8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

export const DragHandle = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  cursor: grab;
  border-right: 1px solid #e2e8f0;

  &:active {
    cursor: grabbing;
    background: #f1f5f9;
  }
`;

export const DragIcon = styled.div`
  width: 20px;
  height: 20px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: #94a3b8;
  }

  &::before {
    top: 6px;
  }

  &::after {
    bottom: 6px;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
`;

export const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
`;

export const TimeIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 2px;
    background: currentColor;
    transform-origin: left;
    transform: translateY(-50%);
  }
`;

export const MemoryIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 2px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 2px;
    background: currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PreviewIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid currentColor;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const DeleteIcon = styled.div`
  width: 16px;
  height: 16px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 16px;
    background: currentColor;
    top: 50%;
    left: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
