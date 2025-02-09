import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswordSchema } from "@/types/auth";
import { forgetPasswordSchema } from "@/schema/validation";

import Button from "@/components/shared/Button";
import HeaderBox from "@/components/header/HeaderBox";
import { useAuthentication } from "@/lib/actions/user.actions";
import { THEME } from "@/constants/theme";
import FormField from "@/components/wrapper/FormField";

const ForgetPasswordScreen = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { forgetPassword } = useAuthentication();

  const onSubmit = async (data: ForgetPasswordSchema) => {
    const result = await forgetPassword(data);

    if (result.success) {
      router.replace(`/verify-password?email=${data.email}`);
    } else {
      setErrorMessage(`"not working", ${result.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <HeaderBox
          title={"Forget Password"}
          message={"Enter a valid email to reset your password"}
        />
        <View style={styles.authContainer}>
          <FormField
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your Email"
            errorMessage={errors.email?.message}
          />
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <Button
            title={"Submit"}
            onPress={handleSubmit(onSubmit)} // Submit the form on button press
            containerStyle={{ height: 50, marginTop: 10 }}
            current_state={"Active"}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  authContainer: {
    padding: 20,
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.FONT_SIZE.body3,
  },
});
