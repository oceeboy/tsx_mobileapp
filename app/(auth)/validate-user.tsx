import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import OTPInput from '@/components/wrapper/OtpInput';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuthentication } from '@/lib/actions/user.actions';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidateUserSchema } from '@/types/auth';
import { validateUserSchema } from '@/schema/validation';
import { THEME } from '@/constants/theme';
import Button from '@/components/shared/Button';
import HeaderBox from '@/components/example/header/HeaderBox';

const ValidateUserScreen = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidateUserSchema>({
    resolver: zodResolver(validateUserSchema),
    defaultValues: {
      email: email as string,
    },
  });

  const { validateUser } = useAuthentication();

  const onSubmit = async (data: ValidateUserSchema) => {
    if (!data || data.otp.length < 6) {
      setErrorMessage('Field not Complete');
    }

    const result = await validateUser(data);

    if (result.success) {
      router.replace(`/home`);
    } else {
      setErrorMessage(`"not working", ${result.message}`);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{}}
      >
        <HeaderBox title="Enter OTP" message="Chceck your email for code" />
        <View style={{ padding: 20 }}>
          <Controller
            control={control}
            name="otp"
            render={({ field: { value } }) => (
              <OTPInput length={6} onChange={(otp) => setValue('otp', otp)} />
            )}
          />
          {errors.otp && (
            <Text style={styles.errorText}>{errors.otp.message}</Text>
          )}
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            containerStyle={{ height: 50 }}
            textStyle={{}}
            current_state="Active"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ValidateUserScreen;

const styles = StyleSheet.create({
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.FONT_SIZE.body3,

    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
});

/**
 *
 * I need to implement a  logic to generate a new token for validation of user
 * i need to setup a toast config so as am am using a modal for this page
 */
