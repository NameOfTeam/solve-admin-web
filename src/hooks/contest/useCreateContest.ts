import { useState } from 'react';
import { ContestCreateRequest } from '../../types/contest/contest';
import customAxios from '../../libs/customAxios';
import { BaseResponse } from '../../types/common/base';
import { useMutation } from '@tanstack/react-query';

const useCreateContest = () => {
  const [request, setRequest] = useState<ContestCreateRequest>({
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    operatorIds: [],
    participantIds: [],
    problemIds: [],
  });

  const createContest = async () => {
    await customAxios.post<BaseResponse<null>>('/contests', request);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createContest,
    onSuccess: () => {
      console.log('success');
    },
  });

  return { request, handleChange, mutate, isPending, isSuccess };
};

export default useCreateContest;
