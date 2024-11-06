import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
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
  margin-bottom: 2rem;
`;

export const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: #f1f5f9;
  }
`;

export const EditButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
  }
`;

export const UserContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const UserHeader = styled.div`
  margin-bottom: 2rem;
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

export const Avatar = styled(motion.img)`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  object-fit: cover;
  background: #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Username = styled.h1`
  font-size: 2.25rem;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
`;

export const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const DetailItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #475569;
  font-size: 1.1rem;

  svg {
    color: #3b82f6;
    font-size: 1.2em;
  }
`;

export const LoadingSpinner = styled.div`
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
    animation: spin 1s linear infinite;
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

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  margin: 2rem 0;

  strong {
    display: block;
    margin-bottom: 0.5rem;
  }
`;
