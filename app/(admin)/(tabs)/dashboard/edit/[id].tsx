import Button from '@/components/shared/Button';
import HeaderBack from '@/components/shared/HeaderBack';
import FormField from '@/components/wrapper/FormField';
import { useEditProduct, useFetchOneProduct } from '@/modules/admindashboard';
import { editProductSchema } from '@/schema/editproduct.schema';
import { EditProductSchema } from '@/types/product/edit-product.dto';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '@/types/product';

export default function AdminEditProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const productId = id as string;

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { data: product, isLoading: fetchingProduct } =
    useFetchOneProduct(productId);
  const { mutate: updateProduct, isPending: updating } = useEditProduct();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
  });

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  useEffect(() => {
    if (product) {
      setValue('id', product._id);
      setValue('productName', product.productName);
      setValue('productDescription', product.productDescription);
      setValue('productPrice', product.productPrice);
      setValue('category', product.category);
      setValue('sku', product.sku),
        setValue('stockQuantity', product.stockQuantity);
      setSelectedImages(product.productImages || []);
    }
  }, [product, setValue]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      const updatedImages = [...selectedImages, ...uris];
      setSelectedImages(updatedImages);
      setValue('productImages', updatedImages, { shouldValidate: true });
    }
  };

  const onEditProduct = async (data: EditProductSchema) => {
    const formData = new FormData();
    formData.append('id', data.id);

    selectedImages.forEach((image, index) => {
      formData.append('productImages', {
        uri: image,
        type: 'image/jpeg',
        name: `product-${index}.jpg`,
      } as any);
    });

    // Create an object matching the expected type
    const updateData = {
      id: data.id,
      updateData: {
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        category: data.category,
        stockQuantity: data.stockQuantity,
      },
      images: selectedImages.map((image, index) => ({
        uri: image,
        type: 'image/jpeg',
        name: `product-${index}.jpg`,
      })),
    };

    updateProduct(updateData, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.formContainer}>
            {selectedImages.length > 0 ? (
              <>
                <Animated.View
                  entering={FadeInRight.springify()}
                  exiting={FadeOutRight.springify()}
                  style={styles.imageWrapper}
                >
                  <Image
                    source={{ uri: selectedImages[0] }}
                    style={styles.mainImage}
                  />
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => setSelectedImages(selectedImages.slice(1))}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.ScrollView
                  entering={FadeInRight.springify().damping(0.5).delay(100)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailContainer}
                >
                  {selectedImages.slice(1).map((img, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        const updatedImages = [...selectedImages];
                        const [selected] = updatedImages.splice(index + 1, 1);
                        updatedImages.unshift(selected);
                        setSelectedImages(updatedImages);
                      }}
                    >
                      <Image source={{ uri: img }} style={styles.thumbnail} />
                    </TouchableOpacity>
                  ))}
                </Animated.ScrollView>
              </>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadText}>Upload New</Text>
              </TouchableOpacity>
            )}

            <FormField
              control={control}
              name="productName"
              label="Product Namess"
              errorMessage={errors.productName?.message}
            />
            <FormField
              control={control}
              name="productDescription"
              label="Product Description"
              errorMessage={errors.productDescription?.message}
              multiline
            />
            <FormField
              control={control}
              name="productPrice"
              label="Product Price"
              errorMessage={errors.productPrice?.message}
              textParseInt
            />
            <FormField
              control={control}
              name="category"
              label="Category"
              errorMessage={errors.category?.message}
            />
            <FormField
              control={control}
              name="stockQuantity"
              label="Stock Quantity"
              errorMessage={errors.stockQuantity?.message}
              textParseInt
            />

            <Button
              title="Pick Image"
              containerStyle={{ height: 50 }}
              onPress={pickImage}
              current_state="Active"
            />
            <Button
              title={updating ? 'Updating...' : 'Update Product'}
              containerStyle={{ height: 50 }}
              onPress={handleSubmit(onEditProduct)}
              current_state="Active"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: { padding: 16, gap: 16 },
  mainImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  uploadButton: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  uploadText: { fontSize: 16, color: '#555' },
  imageWrapper: {
    position: 'relative',
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  thumbnailContainer: { flexDirection: 'row', gap: 10 },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
