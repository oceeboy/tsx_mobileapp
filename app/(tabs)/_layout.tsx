import { Tabs } from 'expo-router';

export default function AdminTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', headerShown: false }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{ title: 'Wishlist', headerShown: false }}
      />
      <Tabs.Screen
        name="checkout"
        options={{ title: 'Checkout', headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', headerShown: false }}
      />
    </Tabs>
  );
}
