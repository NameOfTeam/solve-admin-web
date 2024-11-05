import { useState } from 'react';
import axios from 'axios';
import { BaseResponse } from '../../types/common/base';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequest } from '../../types/auth/signup';
import { useNavigate } from 'react-router-dom';

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
  });

  return { request, handleChange, isPending, mutate, isSuccess };
};

export default useSignup;
