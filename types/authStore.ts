export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
export type AuthToken = string;

export interface AuthState {
  data: User | null;
  accessToken: AuthToken | null;
  refreshToken: AuthToken | null;
  status: AuthStatus;
}

export interface AuthActions {
  setData: (data: User) => void;
  setAccessToken: (token: AuthToken) => void;
  setRefreshToken: (token: AuthToken) => void;
  setStatus: (status: AuthStatus) => void;
  resetStore: () => void;
  refreshTokenFlow: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;
