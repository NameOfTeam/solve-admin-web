import styled from '@emotion/styled';
import { useState, useCallback, useEffect } from 'react';

export const Container = styled.div`
  height: 4px;
  width: 100%;
  cursor: col-resize;
  transition: background-color 0.2s ease;
  background-color: #ccc;

  &:hover {
    background-color: #999;
  }
`;

interface Props {
  initialTopHeight: number;
  minHeight: number;
  maxHeight: number;
}

const useVerticalResizable = ({
  initialTopHeight,
  minHeight,
  maxHeight,
}: Props) => {
  const [topHeight, setTopHeight] = useState(initialTopHeight);
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
        const newTopHeight = (e.clientY / window.innerHeight) * 100;
        setTopHeight(Math.max(minHeight, Math.min(maxHeight, newTopHeight)));
      }
    },
    [isDragging, minHeight, maxHeight]
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
    topHeight,
    bottomHeight: 100 - topHeight,
    Resizer,
  };
};

export default useVerticalResizable;
