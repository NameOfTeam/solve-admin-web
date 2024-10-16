import styled from '@emotion/styled';
import { useState, useCallback, useEffect } from 'react';

export const Container = styled.div`
  width: 4px;
  height: 100%;
  cursor: col-resize;
  transition: background-color 0.2s ease;
  background-color: #ccc;

  &:hover {
    background-color: #999;
  }
`;

const useHorizontalResizable = (
  initialLeftWidth = 50,
  minWidth = 20,
  maxWidth = 80
) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: any) => {
      if (isDragging) {
        const newLeftWidth = (e.clientX / window.innerWidth) * 100;
        setLeftWidth(Math.max(minWidth, Math.min(maxWidth, newLeftWidth)));
      }
    },
    [isDragging, minWidth, maxWidth]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const Resizer = () => {
    return <Container onMouseDown={handleMouseDown} />;
  };

  return {
    leftWidth,
    rightWidth: 100 - leftWidth,
    Resizer,
  };
};

export default useHorizontalResizable;
