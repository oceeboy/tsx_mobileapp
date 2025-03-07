import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile-screen" />
      <Stack.Screen name="profile-settings" />
    </Stack>
  );
}
