import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

export default function AdminSettings() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Admin Settings</Text>
      <Pressable
        style={{
          height: 50,
          justifyContent: 'center',
          backgroundColor: 'lightgray',
          marginHorizontal: 20,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => router.replace('/(tabs)/profile/profile-screen')}
      >
        <Animated.Text
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutRight.springify().damping(50).stiffness(500)}
        >
          Switch to User
        </Animated.Text>
      </Pressable>
    </View>
  );
}
