import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
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

export const CreateButton = styled(Link)`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
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

  @media (max-width: 640px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.95rem;
  }
`;

export const ProblemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ProblemCard = styled(Link)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

  &:hover::before {
    transform: scaleX(1);
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

export const ProblemTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.4;
  margin-bottom: 0.5rem;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

export const ProblemContent = styled.p`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProblemMetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;

  svg {
    color: #6366f1;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem;
  color: #6366f1;
`;

export const LoadingText = styled.div`
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  color: #64748b;
  font-size: 1.1rem;

  svg {
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

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  margin-top: 2rem;
  font-weight: 500;

  svg {
    color: #ef4444;
  }
`;
