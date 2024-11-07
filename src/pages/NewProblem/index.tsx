import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { FaClock, FaMemory, FaSpinner } from 'react-icons/fa';
import * as S from './style';
import adminAxios from '../../libs/adminAxios';

interface ProblemRequest {
  title: string;
  content: string;
  input: string;
  output: string;
  memoryLimit: number;
  timeLimit: number;
}

interface ProblemValidate {
  title: boolean;
  content: boolean;
  input: boolean;
  output: boolean;
  memoryLimit: boolean;
  timeLimit: boolean;
}

const editorOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  lineNumbers: 'off',
  glyphMargin: false,
  folding: false,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  padding: { top: 16, bottom: 16 },
  wordWrap: 'on',
  formatOnType: true,
  formatOnPaste: true,
  renderLineHighlight: 'none',
  scrollbar: {
    vertical: 'visible',
    horizontal: 'visible',
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
} as const;

const NewProblem = () => {
  const navigate = useNavigate();
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const [request, setRequest] = useState<ProblemRequest>({
    title: '',
    content: '',
    input: '',
    output: '',
    memoryLimit: 256,
    timeLimit: 1.0,
  });

  const [validate, setValidate] = useState<ProblemValidate>({
    title: true,
    content: true,
    input: true,
    output: true,
    memoryLimit: true,
    timeLimit: true,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await adminAxios.post('/problems', request);
      return data;
    },
    onSuccess: () => {
      navigate('/problems');
    },
  });

  const handleChange = (name: string, value: string | number) => {
    if (name === 'timeLimit') {
      const timeValue = parseFloat(value as string);
      if (!isNaN(timeValue)) {
        setRequest((prev) => ({ ...prev, [name]: Math.max(0.1, timeValue) }));
        setValidate((prev) => ({ ...prev, [name]: timeValue >= 0.1 }));
      }
    } else {
      setRequest((prev) => ({ ...prev, [name]: value }));
      setValidate((prev) => ({
        ...prev,
        [name]: String(value).trim().length > 0,
      }));
    }
  };

  const handleSubmit = () => {
    const newValidate = {
      title: request.title.trim().length > 0,
      content: request.content.trim().length > 0,
      input: request.input.trim().length > 0,
      output: request.output.trim().length > 0,
      memoryLimit: request.memoryLimit > 0,
      timeLimit: request.timeLimit >= 0.1,
    };

    setValidate(newValidate);

    if (Object.values(newValidate).every(Boolean)) {
      mutation.mutate();
    }
  };

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        setLeftWidth(Math.min(Math.max(20, newWidth), 80));
      }
    },
    [isDragging],
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <S.Container>
      <S.SourcePanel width={leftWidth}>
        <S.Title>
          문제 <span>생성</span>
        </S.Title>

        <S.FormGroup>
          <S.Label>제목</S.Label>
          <S.Input
            value={request.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="문제의 제목을 입력하세요"
          />
          {!validate.title && <S.Error>제목을 입력해주세요</S.Error>}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>문제 내용</S.Label>
          <S.EditorWrapper>
            <Editor
              height="300px"
              language="markdown"
              theme="light"
              value={request.content}
              onChange={(value) => handleChange('content', value || '')}
              options={editorOptions}
            />
          </S.EditorWrapper>
          {!validate.content && <S.Error>문제 내용을 입력해주세요</S.Error>}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>입력 설명</S.Label>
          <S.EditorWrapper>
            <Editor
              height="200px"
              language="markdown"
              theme="light"
              value={request.input}
              onChange={(value) => handleChange('input', value || '')}
              options={editorOptions}
            />
          </S.EditorWrapper>
          {!validate.input && <S.Error>입력 설명을 입력해주세요</S.Error>}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>출력 설명</S.Label>
          <S.EditorWrapper>
            <Editor
              height="200px"
              language="markdown"
              theme="light"
              value={request.output}
              onChange={(value) => handleChange('output', value || '')}
              options={editorOptions}
            />
          </S.EditorWrapper>
          {!validate.output && <S.Error>출력 설명을 입력해주세요</S.Error>}
        </S.FormGroup>

        <S.LimitContainer>
          <S.FormGroup>
            <S.Label>메모리 제한 (MB)</S.Label>
            <S.Input
              type="number"
              value={request.memoryLimit}
              onChange={(e) => handleChange('memoryLimit', parseInt(e.target.value))}
              min="1"
            />
            {!validate.memoryLimit && <S.Error>메모리 제한을 입력해주세요</S.Error>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>시간 제한 (초)</S.Label>
            <S.Input
              type="number"
              step="0.1"
              min="0.1"
              value={request.timeLimit}
              onChange={(e) => handleChange('timeLimit', e.target.value)}
              placeholder="예: 1.0"
            />
            {!validate.timeLimit && <S.Error>시간 제한은 0.1초 이상이어야 합니다</S.Error>}
          </S.FormGroup>
        </S.LimitContainer>

        <S.Button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <FaSpinner className="animate-spin" />
              생성 중...
            </>
          ) : (
            '문제 생성'
          )}
        </S.Button>
      </S.SourcePanel>

      <S.Resizer onMouseDown={handleMouseDown} />

      <S.PreviewPanel width={100 - leftWidth}>
        <S.PreviewTitle>{request.title || '제목'}</S.PreviewTitle>

        <S.Section>
          <S.SectionTitle>문제</S.SectionTitle>
          <S.SectionContent>{request.content || '문제 내용을 입력해주세요.'}</S.SectionContent>
        </S.Section>

        <S.Section>
          <S.SectionTitle>입력</S.SectionTitle>
          <S.SectionContent>{request.input || '입력 설명을 입력해주세요.'}</S.SectionContent>
        </S.Section>

        <S.Section>
          <S.SectionTitle>출력</S.SectionTitle>
          <S.SectionContent>{request.output || '출력 설명을 입력해주세요.'}</S.SectionContent>
        </S.Section>

        <S.MetaInfo>
          <S.MetaItem>
            <FaMemory />
            메모리 제한: <strong>{request.memoryLimit} MB</strong>
          </S.MetaItem>
          <S.MetaItem>
            <FaClock />
            시간 제한: <strong>{request.timeLimit.toFixed(1)}초</strong>
          </S.MetaItem>
        </S.MetaInfo>
      </S.PreviewPanel>
    </S.Container>
  );
};

export default NewProblem;
