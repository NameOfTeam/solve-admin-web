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

export const SaveButton = styled(motion.button)`
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

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
  }

  .spinner {
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

export const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const UserProfile = styled.div`
  display: flex;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const AvatarSection = styled.div`
  flex-shrink: 0;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 24px;
  overflow: hidden;
  width: 140px;
  height: 140px;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Avatar = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #e2e8f0;
`;

export const AvatarOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 0.5rem;

  svg {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const Username = styled.h1`
  font-size: 2.25rem;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem 0;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 1.1rem;

  svg {
    color: #3b82f6;
    font-size: 1.2em;
  }
`;

export const FormSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0 0 2rem 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;

  svg {
    color: #3b82f6;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  option {
    padding: 0.5rem;
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

export const ReadOnlyField = styled.div`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #64748b;
  background: #f1f5f9;
`;

export const UploadProgress = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const CurrentInfo = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
