import { Tabs } from "expo-router";

export default function AdminTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="create" options={{ headerShown: false }} />
    </Tabs>
  );
}
