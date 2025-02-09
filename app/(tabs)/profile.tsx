import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

  const goToAdmin = () => {
    router.replace("/(tabs)/dashboard");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Pressable
        style={{
          height: 50,
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          backgroundColor: "lightgray",
          borderRadius: 5,
        }}
        onPress={goToAdmin}
      >
        <Text style={{ color: "blue" }}>go to admin</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
