import { TransitionPresets } from "@react-navigation/bottom-tabs";
import { Stack } from "expo-router";

const ForgetPasswordLayout = () => {
  return (
    <Stack
      screenOptions={{
        ...TransitionPresets.FadeTransition,
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="forgetpassword" />
      <Stack.Screen name="verify-password" />
    </Stack>
  );
};

export default ForgetPasswordLayout;
