import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";

import { useForm } from "react-hook-form";
import { signInSchema, signUpSchema } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignUpSchema } from "@/types/auth";
import Button from "../shared/Button";
import { useRouter } from "expo-router";
import { THEME } from "@/constants/theme";
import { useAuthentication } from "@/lib/actions/user.actions";
import Toast from "react-native-toast-message";
import FormField from "./FormField";

interface AuthFormProps {
  type: "SignIn" | "SignUp";
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const { login, register } = useAuthentication();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof type extends "SignIn" ? SignInSchema : SignUpSchema>({
    resolver: zodResolver(type === "SignIn" ? signInSchema : signUpSchema),
  });

  const onLogin = async (data: SignInSchema) => {
    if (!data) {
      Toast.show({
        type: "info",
        props: {
          text: "Please fill all the fields",
        },
      });
    }
    const result = await login(data);

    if (result.success) {
      router.push(`/validate-user?email=${data.email}`);
    }
  };
  const onRegister = async (data: SignUpSchema) => {
    if (!data) {
      Toast.show({
        type: "info",
        props: {
          text: "Please fill all the fields",
        },
      });
    }

    const result = await register(data);

    if (result.success) {
      router.push(`/validate-user?email=${data.email}`);
    }
  };

  return (
    <View style={styles.container}>
      {type === "SignUp" && (
        <>
          <FormField
            control={control}
            name="firstName"
            label="First name"
            placeholder="Enter your Email"
            errorMessage={errors.firstName?.message}
          />
          <FormField
            control={control}
            name="lastName"
            label="Last name"
            placeholder="Enter your Email"
            errorMessage={errors.lastName?.message}
          />
          <FormField
            control={control}
            name="userName"
            label="Username"
            placeholder="Enter your Email"
            errorMessage={errors.userName?.message}
          />
        </>
      )}

      <FormField
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your Email"
        errorMessage={errors.email?.message}
      />
      <View style={styles.passwordContainer}>
        <FormField
          name="password"
          control={control}
          label="Password"
          placeholder="Enter your Password"
          errorMessage={errors.password?.message} // Display error if validation fails
          secureTextEntry={true} // Set secureTextEntry to true for password fields
        />
        {type === "SignIn" && (
          <View style={styles.forgetPasswordContainer}>
            <TouchableOpacity onPress={() => router.push("/forgetpassword")}>
              <Text>Forget password?</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Button
        title={`${type === "SignIn" ? "Login" : "Register"}`}
        onPress={
          type === "SignIn" ? handleSubmit(onLogin) : handleSubmit(onRegister)
        }
        containerStyle={{ height: 50, marginTop: 10 }}
        current_state={"Active"}
        textStyle={{ fontWeight: "bold" }}
      />
      <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
        <Text
          style={{
            color: THEME.TEXT.PRIMARY,
            fontSize: THEME.FONT_SIZE.MEDIUM,
          }}
        >
          {type === "SignIn"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.replace(`${type === "SignIn" ? "/sign-up" : "/sign-in"}`)
          }
        >
          <Text
            style={{
              color: THEME.TEXT.LINK,
              fontSize: THEME.FONT_SIZE.MEDIUM,
            }}
          >
            {type === "SignIn" ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  forgetPasswordContainer: {
    alignItems: "flex-end",
  },
  passwordContainer: {
    gap: 5,
  },
});
