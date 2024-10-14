import { useEffect } from 'react';
import useCreateProblem from '../../hooks/problem/useCreateProblem';
import * as S from './style';
import { useNavigate } from 'react-router-dom';

const NewProblem = () => {
  const { request, handleChange, isPending, mutate, isSuccess } =
    useCreateProblem();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/problems');
    }
  }, [isSuccess]);

  return (
    <S.Container>
      <S.SourceContainer>
        <S.Title>문제 생성</S.Title>

        <S.InputWrapper>
          <S.Label>Title</S.Label>
          <S.Input name="title" value={request.title} onChange={handleChange} />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>Content</S.Label>
          <S.Textarea
            name="content"
            value={request.content}
            onChange={handleChange}
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>Input</S.Label>
          <S.Textarea
            name="input"
            value={request.input}
            onChange={handleChange}
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>Output</S.Label>
          <S.Textarea
            name="output"
            value={request.output}
            onChange={handleChange}
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>Memory Limit</S.Label>
          <S.Input
            name="memoryLimit"
            type="number"
            value={request.memoryLimit}
            onChange={handleChange}
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>Time Limit</S.Label>
          <S.Input
            name="timeLimit"
            type="number"
            value={request.timeLimit}
            onChange={handleChange}
          />
        </S.InputWrapper>

        <S.Button onClick={() => mutate()} disabled={isPending}>
          {isPending ? 'Loading...' : '생성'}
        </S.Button>
      </S.SourceContainer>

      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>문제 미리보기</S.PreviewTitle>
        </S.PreviewHeader>

        <S.PreviewSection>
          <S.PreviewSectionTitle>문제</S.PreviewSectionTitle>
          <S.PreviewSectionContent>
            A+B를 구하는 프로그램
          </S.PreviewSectionContent>
        </S.PreviewSection>

        <S.PreviewSection>
          <S.PreviewSectionTitle>입력</S.PreviewSectionTitle>
          <S.PreviewSectionContent>ㅁㄴㅇㄹㅁㄴㄹㅇ</S.PreviewSectionContent>
        </S.PreviewSection>

        <S.PreviewSection>
          <S.PreviewSectionTitle>출력</S.PreviewSectionTitle>
          <S.PreviewSectionContent>테스트</S.PreviewSectionContent>
        </S.PreviewSection>
      </S.PreviewContainer>
    </S.Container>
  );
};

export default NewProblem;
