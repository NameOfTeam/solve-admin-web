import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  width: 100%;
  height: 100vh;
`;

export const Box = styled.div`
  background-color: #fff;
  padding: 4rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const Input = styled.input`
  width: 30rem;
  height: 4rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0 1rem;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  width: 30rem;
  height: 4rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
