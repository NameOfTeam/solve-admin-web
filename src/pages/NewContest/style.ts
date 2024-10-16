import styled from '@emotion/styled';
import ThemedContainer from '../../components/ThemedContainer';

export const Container = styled(ThemedContainer)``;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  background-color: #000;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1rem;
`;

export const BackButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;

export const SourceContainer = styled(ThemedContainer)<{ width: number }>`
  flex-direction: column;
  gap: 1rem;
  width: ${({ width }) => `${width}%`};
  background-color: #837dde;
`;

export const PreviewContainer = styled(ThemedContainer)<{ width: number }>`
  flex-direction: column;
  gap: 1rem;
  width: ${({ width }) => `${width}%`};
  background-color: #4740cf;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  resize: none;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
`;
