import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AuthState,
  AuthActions,
  AuthStore,
  AuthToken,
} from "@/types/authStore";
import { AuthService } from "@/services/authService";

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      data: null,
      accessToken: null,
      refreshToken: null,
      status: "loading",

      setData: (data: User) => set({ data }),
      setAccessToken: (accessToken: AuthToken) => set({ accessToken }),
      setRefreshToken: (refreshToken: AuthToken) => set({ refreshToken }),
      setStatus: (status) => set({ status }),

      resetStore: () =>
        set({
          data: null,
          accessToken: null,
          refreshToken: null,
          status: "unauthenticated",
        }),

      refreshTokenFlow: async () => {
        const {
          refreshToken,
          setAccessToken,
          setRefreshToken,
          resetStore,
          setStatus,
        } = get();

        if (!refreshToken) {
          resetStore();
          return;
        }

        try {
          const response = await AuthService.refreshToken(refreshToken);
          setAccessToken(response.accessToken);
          setStatus("authenticated");
        } catch {
          resetStore();
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {},
    }
  )
);

export default useAuthStore;
