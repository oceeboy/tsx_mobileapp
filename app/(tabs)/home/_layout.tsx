import { Stack } from 'expo-router';
import { TransitionPresets } from '@react-navigation/bottom-tabs';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeTransition,
      }}
    >
      {/* Home Screen */}
      <Stack.Screen
        name="home-screen"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
