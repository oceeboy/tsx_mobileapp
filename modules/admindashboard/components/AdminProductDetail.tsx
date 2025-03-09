import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFetchOneProduct } from '../hooks/useProduct.hook';
import { currencyFormatter } from '@/utils/helpers';

interface AdminProductDetailProps {
  id: string;
}

export const AdminProductDetail = ({ id }: AdminProductDetailProps) => {
  const { data, isLoading } = useFetchOneProduct(id); // Ensure correct hook usage
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (data?.productImages?.length) {
      setSelectedImage(data.productImages[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No product found</Text>
      </View>
    );
  }

  const stockColor =
    data.stockQuantity > 10
      ? 'green'
      : data.stockQuantity > 3
      ? 'orange'
      : 'red';

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          {/* Image Container */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.mainImage}
              resizeMode="stretch"
            />
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.column}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {data.productName}
              </Text>
              <Text>{data.sku}</Text>
            </View>
            <View style={styles.columnRight}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {currencyFormatter(data.productPrice)}
              </Text>
              <View style={styles.stockContainer}>
                <View
                  style={[
                    styles.stockIndicator,
                    { backgroundColor: stockColor },
                  ]}
                />
                <Text>
                  {data.stockQuantity}{' '}
                  {data.stockQuantity > 1 ? 'items' : 'item'}
                </Text>
              </View>
            </View>
          </View>

          {/* Thumbnail Selection */}
          <View style={styles.thumbnailContainer}>
            {data.productImages?.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(img)}
              >
                <Image source={{ uri: img }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>

          {/* category */}
          <View style={styles.category}>
            <Text>Category: {data.category}</Text>
          </View>
          {/* Description */}
          <View style={styles.productDescription}>
            <Text style={{ fontWeight: 'bold' }}>Description</Text>
            <Text numberOfLines={8}>
              {data.productDescription
                ? data.productDescription
                : 'No description available'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'blue',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  column: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'flex-start',
  },
  columnRight: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'flex-end',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
  },
  productDescription: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 5,
    padding: 10,
  },
  category: {
    marginTop: 10,
    padding: 10,
  },
});
