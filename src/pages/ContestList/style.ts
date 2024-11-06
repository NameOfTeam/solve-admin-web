import styled from '@emotion/styled';
import { motion } from 'framer-motion';

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
`;

export const CreateButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.1);

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(90deg);
  }
`;

export const ContestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ContestCard = styled.div<{
  status: 'upcoming' | 'ongoing' | 'ended';
}>`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    transition: all 0.3s ease;

    ${({ status }) => {
      switch (status) {
        case 'upcoming':
          return `background: #3b82f6;`;
        case 'ongoing':
          return `background: #10b981;`;
        case 'ended':
          return `background: #6b7280;`;
      }
    }}
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const ContestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

export const ContestTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  flex: 1;
`;

export const VisibilityBadge = styled(motion.span)<{
  visibility: 'PUBLIC' | 'PRIVATE';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  ${({ visibility }) =>
    visibility === 'PUBLIC'
      ? `
    background: #dbeafe;
    color: #1e40af;
    
    &:hover {
      background: #bfdbfe;
    }
  `
      : `
    background: #fee2e2;
    color: #991b1b;
    
    &:hover {
      background: #fecaca;
    }
  `}

  svg {
    font-size: 0.9em;
  }
`;

export const ContestDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ContestInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #475569;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  svg {
    color: #6366f1;
    font-size: 1.1em;
  }
`;

export const ContestMeta = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #64748b;
`;

export const ProblemCount = styled(motion.span)`
  color: #3b82f6;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  background: #dbeafe;
  border-radius: 9999px;
  transition: all 0.2s ease;

  &:hover {
    background: #bfdbfe;
  }
`;

export const OperatorCount = styled(motion.span)`
  color: #8b5cf6;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  background: #ede9fe;
  border-radius: 9999px;
  transition: all 0.2s ease;

  &:hover {
    background: #ddd6fe;
  }
`;

export const SearchBar = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin-left: auto;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 1rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SearchSpinner = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;

  svg {
    animation: spin 1s linear infinite;
    font-size: 1rem;
  }
`;

export const LoadingSpinner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;

  svg {
    font-size: 2rem;
    color: #3b82f6;
    margin-bottom: 1rem;
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
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

export const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  margin: 2rem 0;
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -2px rgba(220, 38, 38, 0.15);
  }

  strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;
