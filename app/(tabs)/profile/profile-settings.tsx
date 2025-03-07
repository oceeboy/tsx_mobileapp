import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function ProfileSettings() {
  const router = useRouter();
  function goToNext() {
    router.replace('/(admin)/(tabs)/dashboard');
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Profile Settings</Text>
      <Button
        title="Go to Next Page"
        onPress={goToNext}
        containerStyle={{
          height: 50,
          marginHorizontal: 20,
        }}
        textStyle={{}}
        current_state="Outline"
      />
    </View>
  );
}
