import { BaseResponse } from '../../types/common/base';
import {
  ProblemCreateRequest,
  ProblemCreateValidate,
  ProblemResponse,
} from '../../types/problem/problem';
import customAxios from '../../libs/customAxios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const useCreateProblem = () => {
  const [request, setRequest] = useState<ProblemCreateRequest>({
    title: '',
    content: '',
    input: '',
    output: '',
    memoryLimit: 0,
    timeLimit: 0,
  });
  const [validate, setValidate] = useState<ProblemCreateValidate>({
    title: false,
    content: false,
    input: false,
    output: false,
    memoryLimit: false,
    timeLimit: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setRequest({ ...request, [name]: value });
    setValidate({ ...validate, [name]: value.trim().length > 0 });
  };

  const createProblem = async () => {
    const { data } = await customAxios.post<BaseResponse<ProblemResponse>>('/problems', request);

    return data.data;
  };

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: createProblem,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { request, handleChange, isPending, mutate, isSuccess, validate };
};

export default useCreateProblem;
