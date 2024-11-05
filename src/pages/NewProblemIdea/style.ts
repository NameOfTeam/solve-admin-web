import styled from '@emotion/styled';

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
    max-width: 768px;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.3;

  span {
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 0 0.2em;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

export const Form = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 24px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  max-width: 800px;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 640px) {
    margin-bottom: 1.5rem;

    label {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1e293b;
  background: white;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    min-height: 250px;
  }

  @media (max-width: 640px) {
    padding: 1rem;
    font-size: 1rem;
    min-height: 200px;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 3rem auto 0;
  min-width: 200px;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px -1px rgba(99, 102, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    margin-top: 2rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;

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
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    font-size: 1em;
  }
`;
