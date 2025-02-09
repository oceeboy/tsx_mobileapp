import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Button,
  Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type FormData = z.infer<typeof formSchema>;

interface OTPInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onChange }) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    onChange(newOtp.join(""));

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) =>
            nativeEvent.key === "Backspace" && handleBackspace(digit, index)
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 5,
  },
});

export default OTPInput;
