import axios from 'axios';
import { BaseResponse } from '../../types/common/base';
import {
  ProblemCreateRequest,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRequest({ ...request, [name]: value });
  };

  const createProblem = async () => {
    const { data } = await customAxios.post<BaseResponse<ProblemResponse>>(
      '/problems',
      request
    );

    return data.data;
  };

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: createProblem,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { request, handleChange, isPending, mutate, isSuccess };
};

export default useCreateProblem;
