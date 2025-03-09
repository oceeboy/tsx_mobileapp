import { Stack } from 'expo-router';

export default function AdminDashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="adminDashboard" />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
