import {
  ProblemCreateRequest,
  ProblemCreateValidate,
} from '../../types/problem/problem';
import MarkdownEditor from '../MarkdownEditor';
import * as S from './style';

interface ProblemSourceProps {
  request: ProblemCreateRequest;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  validate: ProblemCreateValidate;
  isPending: boolean;
  mutate: () => void;
  width: number;
}

const ProblemSource = ({
  request,
  handleChange,
  validate,
  isPending,
  mutate,
  width,
}: ProblemSourceProps) => {
  return (
    <S.SourceContainer width={width}>
      <S.Title>문제 생성</S.Title>

      <S.InputWrapper>
        <S.Label>Title</S.Label>
        <S.Input name="title" value={request.title} onChange={handleChange} />
        <S.Error>{!validate.title && '제목을 입력해주세요.'}</S.Error>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Content</S.Label>
        <MarkdownEditor
          width="100%"
          height="20rem"
          value={request.content}
          onChange={(value) =>
            handleChange({
              target: { name: 'content', value },
            } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
          }
        />
        <S.Error>{!validate.content && '내용을 입력해주세요.'}</S.Error>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Input</S.Label>
        <MarkdownEditor
          width="100%"
          height="20rem"
          value={request.input}
          onChange={(value) =>
            handleChange({
              target: { name: 'input', value },
            } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
          }
        />
        <S.Error>{!validate.input && '입력을 입력해주세요.'}</S.Error>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Output</S.Label>
        <MarkdownEditor
          width="100%"
          height="20rem"
          value={request.output}
          onChange={(value) =>
            handleChange({
              target: { name: 'output', value },
            } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
          }
        />
        <S.Error>{!validate.output && '출력을 입력해주세요.'}</S.Error>
      </S.InputWrapper>

      <S.LimitWrapper>
        <S.InputWrapper>
          <S.Label>Memory Limit</S.Label>
          <S.Input
            name="memoryLimit"
            type="number"
            value={request.memoryLimit}
            onChange={handleChange}
          />
          <S.Error>
            {!validate.memoryLimit && '메모리 제한을 입력해주세요.'}
          </S.Error>
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>Time Limit</S.Label>
          <S.Input
            name="timeLimit"
            type="number"
            value={request.timeLimit}
            onChange={handleChange}
          />
          <S.Error>
            {!validate.timeLimit && '시간 제한을 입력해주세요.'}
          </S.Error>
        </S.InputWrapper>
      </S.LimitWrapper>

      <S.Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Loading...' : '생성'}
      </S.Button>
    </S.SourceContainer>
  );
};

export default ProblemSource;
