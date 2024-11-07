import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

export const Content = styled(motion.div)`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

export const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 20px;
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

export const Body = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }
`;

export const Section = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

export const MarkdownContent = styled.div`
  color: #1e293b;
  font-size: 1rem;
  line-height: 1.7;

  p {
    margin-bottom: 1rem;
  }

  pre {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
    border: 1px solid #e2e8f0;
  }

  code {
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  blockquote {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #64748b;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 2rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
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
