import styled from '@emotion/styled';
import ThemedContainer from '../../components/ThemedContainer';
import { Link } from 'react-router-dom';

export const Container = styled(ThemedContainer)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ProblemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Problem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProblemTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
`;
