import { useEffect, useState } from 'react';
import { LoginRequest, LoginResponse } from '../../types/auth/login';
import axios, { AxiosError } from 'axios';
import useTokenStore from '../../stores/useTokenStore';
import { BaseResponse } from '../../types/common/base';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../types/common/error';

const useLogin = () => {
  const [request, setRequest] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const { setAccessToken, setRefreshToken, clearTokens } = useTokenStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRequest({ ...request, [name]: value.trim() });
  };

  const login = async () => {
    const { data } = await axios.post<BaseResponse<LoginResponse>>(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      request,
    );

    return data.data;
  };

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      navigate('/');
    },
    onError: (error: AxiosError) => {
      const code = (error.response?.data as ErrorResponse).code;

      if (code === 'USER_NOT_FOUND_BY_USERNAME') {
        toast.error('존재하지 않는 사용자입니다.');
      } else if (code === 'PASSWORD_NOT_MATCH') {
        toast.error('비밀번호가 일치하지 않습니다.');
      }
    },
  });

  useEffect(() => {
    clearTokens();
  }, [clearTokens]);

  return { request, handleChange, isPending, mutate, isSuccess };
};

export default useLogin;
