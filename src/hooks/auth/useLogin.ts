import { useEffect, useState } from 'react';
import { LoginRequest, LoginResponse } from '../../types/auth/login';
import axios from 'axios';
import useTokenStore from '../../stores/useTokenStore';
import { BaseResponse } from '../../types/common/base';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [request, setRequest] = useState<LoginRequest>({
    username: '',
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
      request
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
  });

  useEffect(() => {
    clearTokens();
  }, []);

  return { request, handleChange, isPending, mutate, isSuccess };
};

export default useLogin;
