import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/schema/product.schema";
import { CreateProductDto } from "@/types/product/create-product.dto";
import * as ImagePicker from "expo-image-picker";
import HeaderBox from "@/components/header/HeaderBox";
import Button from "@/components/shared/Button";
import FormField from "@/components/wrapper/FormField";
import { useCreateProduct } from "@/hooks/admin/useAdmin";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

export default function AdminCreate() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      productPrice: 0,
      productImages: [],
      category: "",
      stockQuantity: 0,
      variants: [],
      tags: [],
      isOnSale: false,
      salePrice: 0,
      reviews: [],
    },
  });

  const { mutate, isLoading, isSuccess } = useCreateProduct();

  // Function to pick images from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // Fixed this now
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      const updatedImages = [...selectedImages, ...uris];

      setSelectedImages(updatedImages);
      setValue("productImages", updatedImages, { shouldValidate: true }); // Uses updatedImages
    }
  };

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take photos."
      );
    }
  };

  const openCamera = async () => {
    if (!cameraPermission) await requestCameraPermissions();

    if (cameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const uris = result.assets.map((asset) => asset.uri);
        setSelectedImages((prev) => [...prev, ...uris]);
      }
    }
  };

  const chooseImageSource = () => {
    Alert.alert(
      "Select Image",
      "Choose an option to add a product image",
      [
        { text: "Take Photo", onPress: openCamera },
        { text: "Choose from Library", onPress: pickImage },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const onCreateProduct = (data: CreateProductDto) => {
    const formData = new FormData();

    data.productImages.forEach((image, index) => {
      formData.append(`productImages`, {
        uri: image,
        type: "image/jpeg",
        name: `product-${index}.jpg`,
      } as any);
    });

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "productImages") {
        // Append numeric values as raw values (not JSON strings)
        if (typeof value === "number" || typeof value === "boolean") {
          formData.append(key, String(value));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      }
    });

    console.log("Product Data:", formData);
    mutate(formData);
  };

  if (isSuccess) {
    console.log("working");
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    if (hoveredIndex === index) setHoveredIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBox title="Create Product" message={"Create a new product"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.formContainer}>
            {selectedImages.length > 0 ? (
              <>
                {/* Main Image */}
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(200)}
                  exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                  style={styles.imageWrapper}
                >
                  <Image
                    source={{ uri: selectedImages[0] }}
                    style={styles.mainImage}
                  />
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => removeImage(0)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </Animated.View>

                {/* Thumbnails */}
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
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={chooseImageSource}
              >
                <Text style={styles.uploadText}>Upload New</Text>
              </TouchableOpacity>
            )}

            <FormField
              control={control}
              name="productName"
              label="Product Name"
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
              onPress={chooseImageSource}
              current_state="Active"
            />

            <Button
              title={isLoading ? "Uploading..." : "Upload Product"}
              containerStyle={{ height: 50 }}
              onPress={handleSubmit(onCreateProduct)}
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
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  thumbnailContainer: { flexDirection: "row", gap: 10 },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  uploadButton: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  uploadText: { fontSize: 16, color: "#555" },
  imageWrapper: {
    position: "relative",
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  removeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
  },
});
