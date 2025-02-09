import useAuthStore from "@/store/auth/auth";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
  const { status, data } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [
    status,
    router,
  ]); /**  Runs only when `status` changes: the reason why this is wrapped cause of a forwardRef base navigation failure */
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="validate-user" options={{ presentation: "modal" }} />

      <Stack.Screen
        name="(forget-password)"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default AuthLayout;
