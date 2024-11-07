import React from 'react';
import { PanInfo } from 'framer-motion';
import * as S from './style';
import { ProblemResponse } from '../../types/problem/problem';

interface Props {
  problem: ProblemResponse;
  onRemove: (problem: ProblemResponse) => void;
  onPreview: (problem: ProblemResponse) => void;
  onMove: (problem: ProblemResponse, direction: 1 | -1) => void;
}

const DraggableProblem: React.FC<Props> = ({ problem, onRemove, onPreview, onMove }) => {
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (Math.abs(info.offset.y) > threshold) {
      onMove(problem, info.offset.y > 0 ? 1 : -1);
    }
  };

  return (
    <S.Container
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      layout
      transition={{
        layout: { duration: 0.3 },
      }}
    >
      <S.DragHandle>
        <S.DragIcon />
      </S.DragHandle>

      <S.Content>
        <S.Header>
          <S.Title>{problem.title}</S.Title>
          <S.Controls>
            <S.IconButton onClick={() => onPreview(problem)}>
              <S.PreviewIcon />
            </S.IconButton>
            <S.IconButton onClick={() => onRemove(problem)}>
              <S.DeleteIcon />
            </S.IconButton>
          </S.Controls>
        </S.Header>

        <S.MetaInfo>
          <S.MetaItem>
            <S.TimeIcon />
            {problem.timeLimit}초
          </S.MetaItem>
          <S.MetaItem>
            <S.MemoryIcon />
            {problem.memoryLimit}MB
          </S.MetaItem>
        </S.MetaInfo>
      </S.Content>
    </S.Container>
  );
};

export default DraggableProblem;
