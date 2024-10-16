import customAxios from '../../libs/customAxios';
import { BaseResponse } from '../../types/common/base';
import { ProblemResponse } from '../../types/problem/problem';
import { useQuery } from '@tanstack/react-query';

const useGetProblem = (problemId: number) => {
  const getProblem = async (problemId: number) => {
    const { data } = await customAxios.get<BaseResponse<ProblemResponse>>(
      `/problems/${problemId}`
    );

    return data.data;
  };
  const { data } = useQuery({
    queryKey: ['problem', problemId],
    queryFn: () => getProblem(problemId),
  });

  return { data };
};

export default useGetProblem;
