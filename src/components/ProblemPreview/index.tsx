import React from 'react';
import ReactMarkdown from 'react-markdown';
import * as S from './style';
import { ProblemResponse } from '../../types/problem/problem';

interface ProblemPreviewProps {
  problem: ProblemResponse;
  onClose: () => void;
}

const ProblemPreview = ({ problem, onClose }: ProblemPreviewProps) => {
  return (
    <S.Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <S.Content
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <S.Header>
          <S.Title>{problem.title}</S.Title>
          <S.CloseButton onClick={onClose}>
            <S.CloseIcon />
          </S.CloseButton>
        </S.Header>

        <S.Body>
          <S.Section>
            <S.SectionTitle>문제</S.SectionTitle>
            <S.MarkdownContent>
              <ReactMarkdown>{problem.content}</ReactMarkdown>
            </S.MarkdownContent>
          </S.Section>

          <S.Section>
            <S.SectionTitle>입력</S.SectionTitle>
            <S.MarkdownContent>
              <ReactMarkdown>{problem.input}</ReactMarkdown>
            </S.MarkdownContent>
          </S.Section>

          <S.Section>
            <S.SectionTitle>출력</S.SectionTitle>
            <S.MarkdownContent>
              <ReactMarkdown>{problem.output}</ReactMarkdown>
            </S.MarkdownContent>
          </S.Section>

          <S.MetaInfo>
            <S.MetaItem>
              <S.TimeIcon />
              시간 제한: {problem.timeLimit}초
            </S.MetaItem>
            <S.MetaItem>
              <S.MemoryIcon />
              메모리 제한: {problem.memoryLimit}MB
            </S.MetaItem>
          </S.MetaInfo>
        </S.Body>
      </S.Content>
    </S.Overlay>
  );
};

export default ProblemPreview;
