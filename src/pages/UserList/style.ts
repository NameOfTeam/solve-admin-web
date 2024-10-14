import styled from '@emotion/styled';
import ThemedContainer from '../../components/ThemedContainer';
import ThemedText from '../../components/ThemedText';

export const Container = styled(ThemedContainer)`
  flex-direction: column;
`;

export const Title = styled(ThemedText)`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 100px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
