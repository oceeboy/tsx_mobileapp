import UserHeader from '@/components/shared/UserHeader';
import { THEME } from '@/constants/theme';
import { useProducts } from '@/hooks/products/useProduct';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export default function AdminDashboard() {
  const router = useRouter();

  const GoodDeeds = 4;

  function viewProductDetails(id: string) {
    router.push(`/(admin)/(tabs)/dashboard/${id}`);
  }

  // const [data, setData] = React.useState(fetchProducts());

  const { data } = useProducts();

  // console.log(data);

  const ProductData = data;

  return (
    <>
      <View style={styles.container}>
        <UserHeader />
        <Animated.FlatList
          data={ProductData}
          keyExtractor={(item) => item._id}
          renderItem={(item) => (
            // <HomeComponent
            //   title={item.item.productName}
            //   description={item.item.productDescription}
            //   action={() => actionButton(item.item._id)}
            //   photo={item.item.productImages}
            // />
            <TouchableOpacity
              style={{
                padding: 20,
                marginHorizontal: 20,
                backgroundColor: '#bdbdbd',
                marginVertical: 10,
                borderRadius: 10,
              }}
              key={item.item._id}
              onPress={() => viewProductDetails(item.item._id)}
            >
              <Text>{item.item.productName}</Text>
            </TouchableOpacity>
          )}
          keyboardDismissMode={'on-drag'}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.BACKGROUND.PRIMARY,
    flex: 1,
  },
});
