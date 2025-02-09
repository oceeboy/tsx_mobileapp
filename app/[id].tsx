import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProduct } from "@/hooks/products/useProduct";
import { Product } from "@/types/product";

const DetailsPramsScreen = () => {
  const router = useRouter();

  const { productId } = useLocalSearchParams();

  // using the hook to get a product with id
  const { data, isLoading } = useProduct(productId as string);
  const productData = data as Product;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text> {productData.productName}</Text>
      <Text>{productData.productDescription} </Text>
    </View>
  );
};

export default DetailsPramsScreen;

const styles = StyleSheet.create({});
