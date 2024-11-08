import styled from '@emotion/styled';
import { motion } from 'framer-motion';

type VariantType = 'success' | 'warning' | 'error' | 'info';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
`;

export const Container = styled.div`
  width: calc(100% - 250px); // 사이드바 너비 제외
  min-height: 100vh;
  margin: 0 auto;
  padding: 2.5rem 3rem;
  background-color: #f8fafc;
  transition: all 0.3s ease;
  will-change: transform;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  contain: content;

  @media (max-width: 1400px) {
    margin: 0 2rem;
  }

  @media (max-width: 768px) {
    margin: 0 1rem;
  }
`;

export const Section = styled.section`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  will-change: transform, box-shadow;
  contain: content;

  &:hover {
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 10px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;

  svg {
    color: #6366f1;
  }
`;

export const SectionDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  margin: -1rem 0 1.5rem;
  line-height: 1.5;
`;

export const Header = styled.div`
  margin-bottom: 2.5rem;
  position: relative;
  contain: content;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.3) 0%,
      rgba(59, 130, 246, 0.3) 50%,
      rgba(99, 102, 241, 0.1) 100%
    );
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  will-change: transform;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    margin-top: 0.75rem;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 120px;
  }
`;

export const SubTitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin-top: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  max-width: 600px;
  opacity: 0.9;
`;

export const RequiredMark = styled.span`
  color: #ef4444;
  margin-left: 4px;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.75rem;
`;

const inputStyles = `
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s ease;
  background: #f8fafc;
  will-change: border-color, box-shadow;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    background: white;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const DateTimeInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }

  &::-webkit-datetime-edit {
    color: #1e293b;
    padding: 0;
  }

  &::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
`;

export const Textarea = styled.textarea`
  ${inputStyles}
  min-height: 140px;
  resize: vertical;
`;

export const TimeGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const VisibilityToggle = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const VisibilityOption = styled.button<{ isSelected: boolean }>`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3b82f6' : '#e2e8f0')};
  border-radius: 10px;
  background: ${({ isSelected }) => (isSelected ? '#ebf5ff' : '#f8fafc')};
  color: ${({ isSelected }) => (isSelected ? '#3b82f6' : '#64748b')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  will-change: transform, background-color;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
  }

  svg {
    font-size: 1.1em;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SelectButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.15);
  will-change: transform;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 6px rgba(99, 102, 241, 0.2),
      0 8px 12px rgba(99, 102, 241, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.25rem;
  background: #f1f5f9;
  border-radius: 9999px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s ease;
  will-change: transform, background-color;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  svg {
    cursor: pointer;
    color: #64748b;
    transition: color 0.2s ease;

    &:hover {
      color: #ef4444;
    }

    &:last-child {
      font-size: 0.85em;
    }
  }
`;

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  will-change: opacity;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 20px 48px rgba(0, 0, 0, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.1);
  will-change: transform;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 1.375rem;
    font-weight: 700;
    color: #1e293b;
  }
`;

export const ModalBody = styled.div`
  padding: 1.75rem;
  overflow-y: auto;
  max-height: 70vh;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
  border-radius: 8px;

  &:hover {
    color: #ef4444;
    background: #fee2e2;
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const UserItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ isSelected }) => (isSelected ? '#ebf5ff' : 'white')};
  color: ${({ isSelected }) => (isSelected ? '#3b82f6' : '#1e293b')};
  margin-bottom: 0.75rem;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#bfdbfe' : '#e2e8f0')};
  will-change: transform, background-color;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#dbeafe' : '#f8fafc')};
    transform: translateY(-1px);
  }

  svg {
    color: ${({ isSelected }) => (isSelected ? '#3b82f6' : '#64748b')};
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: #3b82f6;
  font-weight: 500;

  svg {
    animation: spin 1s linear infinite;
    font-size: 1.25rem;
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

export const Badge = styled.span<{ variant?: VariantType }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;

  ${({ variant = 'info' }) => {
    switch (variant) {
      case 'success':
        return `
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        `;
      case 'warning':
        return `
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fef3c7;
        `;
      case 'error':
        return `
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        `;
      default:
        return `
          background: #f0f7ff;
          color: #3b82f6;
          border: 1px solid #bfdbfe;
        `;
    }
  }}
`;

export const SearchInput = styled.input`
  ${inputStyles}
  margin-bottom: 1.5rem;
  padding-right: 2.5rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
  margin: 1rem 0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cbd5e1;
    background: #f1f5f9;
  }

  svg {
    font-size: 2.5rem;
    color: #94a3b8;
    margin-bottom: 1rem;
  }

  h4 {
    color: #1e293b;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 0.95rem;
    max-width: 300px;
    margin: 0 auto;
    line-height: 1.5;
  }
`;

export const SubmitButton = styled.button`
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow:
    0 4px 6px rgba(99, 102, 241, 0.15),
    0 10px 20px rgba(99, 102, 241, 0.1);
  will-change: transform;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 6px 8px rgba(99, 102, 241, 0.2),
      0 12px 24px rgba(99, 102, 241, 0.15);

    &::before {
      transform: translateX(100%);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;
  }

  @media (max-width: 640px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

// CSS 애니메이션을 위한 키프레임 정의
export const keyframes = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
};

// 반응형 디자인을 위한 브레이크포인트
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
} as const;

// 자주 사용되는 transition 모음
export const transitions = {
  base: 'all 0.3s ease',
  fast: 'all 0.2s ease',
  smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// 미디어 쿼리 헬퍼 함수
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
} as const;
