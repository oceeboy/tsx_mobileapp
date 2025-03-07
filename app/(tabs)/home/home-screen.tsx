import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const GoodDeeds = 4;

  function viewProductDetails(id: string) {
    router.push(`/home/${id}`);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Go to Next Page"
        onPress={() => viewProductDetails('1')}
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
