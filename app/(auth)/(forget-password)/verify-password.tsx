import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/shared/Button";
import OTPInput from "@/components/wrapper/OtpInput";
import HeaderBox from "@/components/header/HeaderBox";
import { Controller, useForm } from "react-hook-form";
import { useAuthentication } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { THEME } from "@/constants/theme";
import { ChangePasswordSchema, ForgetPasswordSchema } from "@/types/auth";
import { changePasswordSchema } from "@/schema/validation";

const VerifyPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: email as string,
    },
  });

  const { changePassword, generateOtp } = useAuthentication();

  const onSubmit = async (data: ChangePasswordSchema) => {
    if (!data || data.otp.length < 6) {
      setErrorMessage("Field not Complete");
    }

    const result = await changePassword(data);

    if (result.success) {
      router.replace(`/sign-in`);
    } else {
      setErrorMessage(`"not working", ${result.message}`);
    }
  };

  async function generateNewToken(email: string) {
    const result = await generateOtp({ email });

    if (result.success) {
    } else {
      setErrorMessage(`"not working", ${result.message}`);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
        backgroundColor: THEME.BACKGROUND.PRIMARY,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{}}
      >
        <HeaderBox
          title="Enter New Password and OTP "
          message="Chceck your email for code"
        />
        <View style={{ padding: 20 }}>
          <View style={styles.label}>
            <Text style={styles.inputLabel}>New Password</Text>
          </View>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputField}
                placeholder={`${email}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword?.message}</Text>
          )}
          <Controller
            control={control}
            name="otp"
            render={({ field: { value } }) => (
              <OTPInput length={6} onChange={(otp) => setValue("otp", otp)} />
            )}
          />
          {errors.otp && (
            <Text style={styles.errorText}>{errors.otp.message}</Text>
          )}

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          <View style={{ flexDirection: "row", gap: 50, marginTop: 30 }}>
            <Button
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              containerStyle={{ height: 50, flex: 1 }}
              textStyle={{}}
              current_state="Active"
            />
            <Button
              title="Get Code"
              onPress={() => generateNewToken(email as string)}
              containerStyle={{
                height: 50,
                flex: 1,
                backgroundColor: "white",
              }}
              textStyle={{ color: "black" }}
              current_state="Outline"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyPassword;

const styles = StyleSheet.create({
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.FONT_SIZE.body3,

    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  inputField: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: THEME.FONT_SIZE.MEDIUM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    marginBottom: 5,
  },

  label: {},
});

/**
 *
 * I need to implement a  logic to generate a new token for validation of user
 * i need to setup a toast config so as am am using a modal for this page
 */
