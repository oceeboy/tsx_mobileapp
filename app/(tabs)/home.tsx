import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import HomeComponent from "@/components/content/HomeComponent";

import { Data } from "@/constants";
import { useRouter } from "expo-router";
import { THEME } from "@/constants/theme";
import { useProducts } from "@/hooks/products/useProduct";

const HomeScreen = () => {
  const router = useRouter();
  function actionButton(id: string) {
    router.navigate(`/[id]?productId=${id}`);
  }

  // const [data, setData] = React.useState(fetchProducts());

  const { data } = useProducts();

  // console.log(data);

  const ProductData = data;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {ProductData &&
          ProductData.map((item) => (
            <HomeComponent
              key={item._id}
              title={item.productName}
              description={item.productDescription}
              action={() => actionButton(item._id)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.BACKGROUND.PRIMARY,
    flex: 1,
  },
});
