import useAuthStore from '@/store/auth/auth';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const AuthLayout = () => {
  const { status, rehydratedAuthState } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const initializeAuthState = async () => {
      await rehydratedAuthState();

      if (status === 'authenticated') {
        router.replace('/home');
      }
    };

    initializeAuthState();
  }, [status]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in"
        // options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="validate-user" options={{ presentation: 'modal' }} />

      <Stack.Screen
        name="(forget-password)"
        // options={{ presentation: 'modal' }}
      />
    </Stack>
  );
};

export default AuthLayout;
