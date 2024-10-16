import styled from '@emotion/styled';
import Markdown from 'react-markdown';

export const PreviewContainer = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;
  height: 100%;
  background-color: #423f4a;
  scrollbar-width: none;
  width: ${({ width }) => width}%;
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

export const PreviewSectionTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
`;

export const PreviewSectionContent = styled(Markdown)`
  font-size: 1.2rem;
  color: #fff;
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
