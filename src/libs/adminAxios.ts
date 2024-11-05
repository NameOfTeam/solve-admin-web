import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getTokenStore } from '../stores/useTokenStore';
import { ErrorResponse } from '../types/common/error';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const adminAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`,
  withCredentials: true,
});

adminAxios.interceptors.request.use(
  async (config) => {
    const { accessToken } = getTokenStore();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

adminAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest && !originalRequest._retry && error.status === 401) {
      originalRequest._retry = true;

      const { refreshToken, setAccessToken, setRefreshToken } = getTokenStore();

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reissue`, {
            refreshToken,
          });

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return adminAxios(originalRequest);
        } catch (error) {
          console.error(error);

          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default adminAxios;
