import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '@/components/wrapper/AuthForm';
import { THEME } from '@/constants/theme';
import HeaderBox from '@/components/example/header/HeaderBox';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        >
          <HeaderBox
            title={'Register'}
            message={'Please enter your details to Register an account'}
          />
          <AuthForm type="SignUp" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND.PRIMARY,
  },
});
