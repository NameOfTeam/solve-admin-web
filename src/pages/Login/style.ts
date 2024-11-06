import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface InputProps {
  hasError?: boolean;
}

interface ButtonProps {
  disabled?: boolean;
}

interface LabelProps {
  htmlFor: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  .background-gradient {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 1000px;
    background: conic-gradient(from 0deg, #6366f1, #3b82f6, #2563eb, #1d4ed8, #3b82f6, #6366f1);
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
    z-index: 0;
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    padding: 2.5rem 2rem;
    gap: 1.5rem;
  }
`;

export const LogoContainer = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
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

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const FormGroup = styled.div`
  width: 100%;
  position: relative;
`;

export const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;

  span {
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 1rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border-radius: 12px;
  z-index: -1;
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 3.5rem;
  padding: 0 1.25rem;
  font-size: 1rem;
  color: #1e293b;
  background: transparent;
  border: 2px solid ${(props) => (props.hasError ? '#ef4444' : '#e2e8f0')};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? '#ef4444' : '#3b82f6')};
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    height: 3rem;
    font-size: 0.95rem;
  }
`;

export const Button = styled.button<ButtonProps>`
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
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 640px) {
    height: 3rem;
    font-size: 1rem;
  }
`;

export const LoadingSpinner = styled(motion.div)`
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

export const SecurityNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 8px;

  svg {
    color: #3b82f6;
  }
`;
