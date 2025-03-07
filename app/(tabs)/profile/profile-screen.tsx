import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View>
        <Text>Profile Screen</Text>
        <Button
          title="Go to Next Page"
          onPress={() => router.push(`/profile/profile-settings`)}
          containerStyle={{
            height: 50,
            marginHorizontal: 20,
          }}
          textStyle={{}}
          current_state="Outline"
        />
      </View>
    </SafeAreaView>
  );
}
