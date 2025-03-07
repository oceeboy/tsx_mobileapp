import { create } from 'zustand';

import {
  clearTokens as clearTokenManager,
  getAccessToken,
  getRefreshToken,
  setAccessToken as persistAccessToken,
  setRefreshToken as persistRefreshToken,
} from '../token/token-manager';
import http from '@/lib/ky';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  status: 'authenticated' | 'unauthenticated';
  data: User | null;
  setAccessToken: (token: string) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  clearTokens: () => Promise<void>;
  rehydratedAuthState: () => Promise<void>;
  refreshTokenFlow: () => Promise<void>;
  setData: (data: User) => Promise<void>;
};

type TokenResponse = {
  accessToken: string | null;
  refreshToken?: string | null;
};

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  status: 'unauthenticated',
  data: null,

  setAccessToken: async (token: string) => {
    await persistAccessToken(token);
    set({ accessToken: token, status: 'authenticated' });
  },

  setRefreshToken: async (token: string) => {
    await persistRefreshToken(token);
    set({ refreshToken: token });
  },

  refreshTokenFlow: async () => {
    const storedRefreshToken = await getRefreshToken();
    if (!storedRefreshToken) {
      await useAuthStore.getState().clearTokens();
      return;
    }

    const response = await http.post('auth/refresh-token', {
      json: { refreshToken: storedRefreshToken },
    });

    if (!response.ok) {
      await useAuthStore.getState().clearTokens();
      return;
    }

    const { accessToken }: TokenResponse = await response.json();

    if (accessToken) {
      await useAuthStore.getState().setAccessToken(accessToken);
    }
  },

  rehydratedAuthState: async () => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, status: 'authenticated' });
    } else {
      set({ accessToken, refreshToken, status: 'unauthenticated' });
    }
  },

  clearTokens: async () => {
    await clearTokenManager();
    set({ accessToken: null, refreshToken: null, status: 'unauthenticated' });
  },

  setData: async (userData: User) => {
    set({ data: userData });
  },
}));

export default useAuthStore;
