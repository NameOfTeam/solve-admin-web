import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TokenStore {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;

  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;

  clearTokens: () => void;
}

const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      accessToken: '',
      setAccessToken: (accessToken) => set({ accessToken }),

      refreshToken: '',
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      clearTokens: () => set({ accessToken: '', refreshToken: '' }),
    }),
    { name: 'token', storage: createJSONStorage(() => localStorage) },
  ),
);

export const getTokenStore = () => {
  return {
    accessToken: useTokenStore.getState().accessToken,
    refreshToken: useTokenStore.getState().refreshToken,
    setAccessToken: useTokenStore.getState().setAccessToken,
    setRefreshToken: useTokenStore.getState().setRefreshToken,
    clearTokens: useTokenStore.getState().clearTokens,
  };
};

export default useTokenStore;
