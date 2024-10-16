import styled from '@emotion/styled';
import ThemedText from '../ThemedText';

export const Title = styled(ThemedText)`
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

export const Textarea = styled.textarea`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  resize: none;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: white;
`;

export const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  font-weight: 400;
`;

export const Button = styled.button`
  padding: 1rem;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  background-color: #4740cf;
  outline: none;

  &:hover {
    background-color: #3a36b1;
  }
`;

export const SourceContainer = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: ${({ width }) => width}%;
  height: 100%;
  padding: 1rem;
  overflow-y: scroll;
  background-color: #423f4a;
  scrollbar-width: none;
`;

export const LimitWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-self: center;
`;
