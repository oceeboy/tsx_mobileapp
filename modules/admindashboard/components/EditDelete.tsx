import Button from '@/components/shared/Button';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useDeleteOneProduct } from '../hooks/useProduct.hook';

interface EditDeleteProps {
  id: string;
}

export function EditDelete({ id }: EditDeleteProps) {
  const router = useRouter();
  const { mutate, isSuccess, isPending } = useDeleteOneProduct();

  function deleteProduct() {
    mutate(id, {
      onSuccess: () => {
        router.replace('/(admin)/(tabs)/dashboard/adminDashboard');
      },
    });
  }

  function editProduct() {
    router.push(`/dashboard/edit/${id}`);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Edit"
        onPress={editProduct}
        containerStyle={styles.button}
        current_state="Outline"
      />
      <Button
        title="Delete"
        onPress={deleteProduct}
        containerStyle={styles.button}
        current_state={isPending ? 'Disabled' : 'Active'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    height: 50,
  },
});
