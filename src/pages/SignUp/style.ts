import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 100vh;
  background: #f8fafc;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Box = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3.5rem 4rem;
  border-radius: 24px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 20px 25px -5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 480px;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 640px) {
    padding: 2.5rem 2rem;
    gap: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  text-align: center;

  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 1.25rem;
    pointer-events: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 3.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    height: 3rem;
    font-size: 1rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

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

export const FormTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 2rem 0;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;

  span {
    display: flex;
    align-items: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 3.25rem;
  padding: 0 1.25rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1e293b;
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

export const LoginButton = styled.button`
  width: 100%;
  height: 3.25rem;
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;

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

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 30px);
    height: 1px;
    background: #e2e8f0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  span {
    background: #f8fafc;
    padding: 0 1rem;
    color: #64748b;
    font-size: 0.875rem;
  }
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 3.25rem;
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }

  svg {
    font-size: 1.1rem;
  }
`;

export const SecurityNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 10px;
  color: #64748b;
  font-size: 0.875rem;

  svg {
    color: #3b82f6;
  }
`;

export const LeftPanel = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.1;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    padding: 2rem;
    text-align: center;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 2rem;
`;

export const WelcomeText = styled.div`
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    line-height: 1.6;
    margin: 0;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  form {
    width: 100%;
    max-width: 420px;
  }

  @media (max-width: 1024px) {
    padding: 2rem;
  }
`;
