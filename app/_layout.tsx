import { Stack } from "expo-router";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { TransitionPresets } from "@react-navigation/bottom-tabs";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/lib/toast-config";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-tanstack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={
          {
            // ...TransitionPresets.ShiftTransition, // this is for a modal swith in
          }
        } // this is a comment to tell that in handling the drawer effect this is just a fade in transistion for screens
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
