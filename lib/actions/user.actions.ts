import useAuthStore from '@/store/auth/auth';
import http from '../ky';
import ky, { HTTPError } from 'ky';
import {
  ChangePasswordSchema,
  ForgetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  ValidateUserSchema,
} from '@/types/auth';
import Toast from 'react-native-toast-message';

interface TokenResponse {
  userDetails: User;
  accessToken: string;
  refreshToken: string;
}

interface MessageResponse {
  message: string;
}

export const useAuthentication = () => {
  async function login({ ...data }: SignInSchema) {
    if (!data) {
      return { success: false, message: 'Invalid request' };
    }

    try {
      // Send login request

      const result = await http.post('auth/login', { json: data });
      const response: { message: string } = await result.json();

      // Store access token, refresh token, and user data in Zustand store

      Toast.show({
        type: 'success',
        // text1: response.message,
        props: {
          title: 'Successfull',
          description: response.message,
        },
      });

      return { success: true, message: 'Login successful', data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? 'Invalid credentials'
          : 'Failed to login';
      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          description: errorMessage,
        },
      });

      //   addToast(
      //     {
      //       title: "Login Failed",
      //       description: errorMessage,
      //     },
      //     "error"
      //   );

      return { success: false, message: errorMessage };
    }
  }

  async function register({ ...data }: SignUpSchema) {
    if (!data) {
      return { success: false, message: 'Invalid request' };
    }
    try {
      const result = await http.post('auth/register', { json: data });
      const response: { message: string } = await result.json();

      Toast.show({
        type: 'success',
        props: {
          title: 'Successfull',
          description: response.message,
        },
      });

      return {
        success: true,
        message: 'registered successful',
        data: response,
      };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 400
          ? 'Invalid registration details'
          : 'Failed to register user';

      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          description: errorMessage,
        },
      });

      return { success: false, message: errorMessage };
    }
  }

  async function validateUser({ ...data }: ValidateUserSchema) {
    try {
      const result = await http.post('auth/validate-user', { json: data });
      const response: TokenResponse = await result.json();

      // Store access token, refresh token, and user data in Zustand store
      await useAuthStore.getState().setAccessToken(response.accessToken);
      await useAuthStore.getState().setRefreshToken(response.refreshToken);
      await useAuthStore.getState().setData(response.userDetails);

      Toast.show({
        type: 'success',
        props: {
          title: 'Successfull',
          description: 'welcome',
        },
      });

      return { success: true, message: 'Login successful', data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? 'Invalid credentials'
          : 'Failed to Verify Otp';
      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          description: errorMessage,
        },
      });
      return { success: false, message: errorMessage };
    }
  }

  async function generateOtp({ ...data }: ForgetPasswordSchema) {
    if (!data) {
      return { success: false, message: 'Invalid request' };
    }
    try {
      const result = await http.post('auth/generate-otp', { json: data });
      const response: { message: string } = await result.json();

      return { success: true, message: 'OTP sent successful', data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? 'Invalid credentials'
          : 'Failed to send OTP';

      return { success: false, message: errorMessage };
    }
  }

  async function changePassword({ ...data }: ChangePasswordSchema) {
    try {
      const result = await http.post('auth/change-password', { json: data });
      const response: MessageResponse = await result.json();

      return {
        success: true,
        message: 'Change Password successful',
        data: response,
      };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? 'Invalid credentials'
          : 'Failed to Verify Otp';

      return { success: false, message: errorMessage };
    }
  }

  async function forgetPassword({ ...data }: ForgetPasswordSchema) {
    if (!data) {
      return { success: false, message: 'Invalid request' };
    }
    try {
      const result = await http.post('auth/forget-password', {
        json: data,
      });
      const response: { message: string } = await result.json();
      Toast.show({
        type: 'success',
        props: {
          title: 'Successfully',
          description: 'Working',
        },
      });

      return { success: true, message: 'OTP sent successful', data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? 'Invalid credentials'
          : 'Failed to send OTP';
      Toast.show({
        type: 'error',
        props: {
          title: 'Successfully',
          description: errorMessage,
        },
      });

      return { success: false, message: errorMessage };
    }
  }

  async function logout() {
    await useAuthStore.getState().clearTokens();

    Toast.show({
      type: 'success',
      props: {
        title: 'Successfull Logged',
        description: 'We need you here',
      },
    });

    return { success: true, message: 'logged Out successful' };
  }

  return {
    register,
    login,
    logout,
    changePassword,
    validateUser,
    generateOtp,
    forgetPassword,
  };
};
