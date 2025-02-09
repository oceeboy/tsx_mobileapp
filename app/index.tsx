import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const MainPage = () => {
  const router = useRouter();
  return (
    <View style={styles.maincontainer}>
      <Pressable
        onPress={() => {
          router.replace("/sign-in");
        }}
        style={styles.button}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            lineHeight: 24,
            fontSize: 22,
            textTransform: "capitalize",
          }}
        >
          homePage
        </Text>
      </Pressable>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,

    borderRadius: 10,

    backgroundColor: "#eddefe",
  },
});
