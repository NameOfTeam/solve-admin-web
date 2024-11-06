import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 100vh;
  background: #f8fafc;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
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

export const FormTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 2rem 0;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
