import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Landmark } from "lucide-react-native";
import { useAuthentication } from "@/lib/actions/user.actions";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const FavouriteScreen = () => {
  const { logout } = useAuthentication();
  const router = useRouter();
  const onLogout = async () => {
    const result = await logout();

    if (result.success) {
      router.replace("/sign-in");
    } else {
      Toast.show({
        type: "error",
        props: {
          title: "Error logging Out ",
          description: "failed to log out user try again",
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={{
          alignItems: "center",

          marginHorizontal: 20,
          backgroundColor: "#33ff33",
          borderRadius: 10,
          padding: 10,
        }}
        onPress={onLogout}
      >
        <Text>View Content</Text>
      </Pressable>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
