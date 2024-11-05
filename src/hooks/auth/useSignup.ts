import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BaseResponse } from '../../types/common/base';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequest } from '../../types/auth/signup';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../../types/common/error';
import { toast } from 'react-toastify';

const useSignup = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState<SignUpRequest>({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    key: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value.trim() });
  };

  const signup = async (): Promise<BaseResponse<void>> => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/admin/auth/signup`, {
      ...request,
      passwordConfirm: undefined,
    });
    return data.data;
  };

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error: AxiosError) => {
      const code = (error.response?.data as ErrorResponse).code;

      if (code === 'EMAIL_DUPLICATED') {
        toast.error('이미 사용 중인 이메일입니다.');
      } else if (code === 'USERNAME_DUPLICATED') {
        toast.error('이미 사용 중인 사용자 이름입니다.');
      } else if (code === 'INVALID_KEY') {
        toast.error('유효하지 않은 키입니다.');
      }
    },
  });

  return { request, handleChange, isPending, mutate, isSuccess };
};

export default useSignup;
