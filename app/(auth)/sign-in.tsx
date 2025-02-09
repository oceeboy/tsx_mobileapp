import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBox from "@/components/header/HeaderBox";
import { THEME } from "@/constants/theme";
import AuthForm from "@/components/wrapper/AuthForm";

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <HeaderBox
            title={"Sign In"}
            message={"Please enter your details to sign in"}
          />
          <AuthForm type="SignIn" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND.PRIMARY,
  },
});
