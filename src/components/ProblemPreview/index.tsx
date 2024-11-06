import SyntaxHighlighter from 'react-syntax-highlighter';

import * as S from './style';
import remarkGfm from 'remark-gfm';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ProblemCreateRequest } from '../../types/problem/problem';

interface ProblemPreviewProps {
  problem: ProblemCreateRequest;
  width?: number;
}

const ProblemPreview = ({ problem, width = 50 }: ProblemPreviewProps) => {
  return (
    <S.PreviewContainer width={width}>
      <S.PreviewHeader>
        <S.PreviewTitle>{problem.title}</S.PreviewTitle>
      </S.PreviewHeader>

      <S.PreviewSection>
        <S.PreviewSectionTitle>문제</S.PreviewSectionTitle>
        <S.PreviewSectionContent
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter style={nord} language={match[1]} PreTag="div">
                  {String(children)
                    .replace(/\n$/, '')
                    .replace(/\n&nbsp;\n/g, '')
                    .replace(/\n&nbsp\n/g, '')}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter style={nord} background="green" language="textile" PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            },

            blockquote({ children, ...props }) {
              return (
                <blockquote
                  style={{
                    background: '#7afca19b',
                    padding: '1px 15px',
                    borderRadius: '10px',
                  }}
                  {...props}>
                  {children}
                </blockquote>
              );
            },
            img({ ...props }) {
              return (
                <img
                  style={{ maxWidth: '40vw' }}
                  src={props.src?.replace('../../../../public/', '/')}
                  alt="MarkdownRenderer__Image"
                />
              );
            },
            em({ children, ...props }) {
              return (
                <span style={{ fontStyle: 'italic' }} {...props}>
                  {children}
                </span>
              );
            },
          }}>
          {problem.content}
        </S.PreviewSectionContent>
      </S.PreviewSection>

      <S.PreviewSection>
        <S.PreviewSectionTitle>입력</S.PreviewSectionTitle>
        <S.PreviewSectionContent>{problem.input}</S.PreviewSectionContent>
      </S.PreviewSection>

      <S.PreviewSection>
        <S.PreviewSectionTitle>출력</S.PreviewSectionTitle>
        <S.PreviewSectionContent>{problem.output}</S.PreviewSectionContent>
      </S.PreviewSection>

      <S.PreviewSection>
        <S.PreviewSectionTitle>메모리 제한</S.PreviewSectionTitle>
        <S.PreviewSectionContent>{`${problem.memoryLimit} MB`}</S.PreviewSectionContent>
      </S.PreviewSection>

      <S.PreviewSection>
        <S.PreviewSectionTitle>시간 제한</S.PreviewSectionTitle>
        <S.PreviewSectionContent>{`${problem.timeLimit} ms`}</S.PreviewSectionContent>
      </S.PreviewSection>
    </S.PreviewContainer>
  );
};

export default ProblemPreview;
