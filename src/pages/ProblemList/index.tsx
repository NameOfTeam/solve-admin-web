import useGetProblems from '../../hooks/problem/useGetProblems';
import * as S from './style';
const ProblemList = () => {
  const { data, ref, fetchNextPage } = useGetProblems();

  return (
    <S.Container>
      <S.Title>문제 목록</S.Title>

      <S.ProblemWrapper>
        {data?.pages.map((page) =>
          page.content.map((problem) => (
            <S.Problem key={problem.id} to={`/problems/${problem.id}`}>
              <S.ProblemTitle>{problem.title}</S.ProblemTitle>
            </S.Problem>
          ))
        )}
      </S.ProblemWrapper>

      <div ref={ref} />
    </S.Container>
  );
};

export default ProblemList;
