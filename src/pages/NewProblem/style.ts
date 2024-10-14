import styled from '@emotion/styled';
import ThemedContainer from '../../components/ThemedContainer';
import ThemedText from '../../components/ThemedText';

export const Container = styled(ThemedContainer)``;

export const Title = styled(ThemedText)`
  font-size: 2rem;
  font-weight: 700;
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
`;

export const Button = styled.button`
  padding: 1rem;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  background-color: #4740cf;

  &:hover {
    background-color: #3a36b1;
  }
`;

export const SourceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;
  height: 100%;
  padding: 1rem;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  width: 50%;
  height: 100%;
  background-color: #423f4a;
`;

export const PreviewHeader = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
`;

export const PreviewTitle = styled.h1`
  font-size: 1.3rem;
  color: white;
  cursor: pointer;
`;

export const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

export const PreviewSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const PreviewSectionContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

export const PreviewTestCaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

export const PreviewTestCase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;
