import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useAuthentication } from '@/lib/actions/user.actions';

export default function CheckoutScreen() {
  const { logout } = useAuthentication();
  const router = useRouter();
  const onLogout = async () => {
    const result = await logout();

    if (result.success) {
      router.replace('/sign-in');
    } else {
      Toast.show({
        type: 'error',
        props: {
          title: 'Error logging Out ',
          description: 'failed to log out user try again',
        },
      });
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Pressable
        style={{
          alignItems: 'center',

          marginHorizontal: 20,
          backgroundColor: '#33ff33',
          borderRadius: 10,
          padding: 10,
        }}
        onPress={onLogout}
      >
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
}
