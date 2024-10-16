import { useEffect } from 'react';
import useCreateProblem from '../../hooks/problem/useCreateProblem';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import ProblemPreview from '../../components/ProblemPreview';
import ProblemSource from '../../components/ProblemSource';
import useHorizontalResizable from '../../hooks/resizable/useHorizontalResizable';

const NewProblem = () => {
  const { request, handleChange, isPending, mutate, isSuccess, validate } =
    useCreateProblem();
  const navigate = useNavigate();
  const { leftWidth, rightWidth, Resizer } = useHorizontalResizable();

  useEffect(() => {
    if (isSuccess) {
      navigate('/problems');
    }
  }, [isSuccess]);

  return (
    <S.Container>
      <ProblemSource
        width={leftWidth}
        request={request}
        handleChange={handleChange}
        validate={validate}
        isPending={isPending}
        mutate={mutate}
      />
      <Resizer />
      <ProblemPreview width={rightWidth} problem={request} />
    </S.Container>
  );
};

export default NewProblem;
