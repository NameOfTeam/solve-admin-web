import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  min-height: 100vh;
  transition: padding-left 0.3s ease;

  @media (min-width: 769px) {
    padding-left: 280px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 1rem;
  }
`;
