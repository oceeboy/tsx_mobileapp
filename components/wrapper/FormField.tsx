import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react-native"; // Use Lucide for icons

interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  rules?: Partial<{
    required: string | boolean;
    maxLength: number;
    minLength: number;
  }>;
  multiline?: boolean;
  errorMessage?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  textParseInt?: boolean;
}

function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  rules,
  multiline = false,
  errorMessage,
  required = false,
  secureTextEntry = false,
  textParseInt = false,
}: FormFieldProps<TFieldValues>) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        ...(required && { required: "This field is required" }),
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && (
            <Text style={styles.label}>
              {label} {required && <Text style={styles.required}>*</Text>}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, multiline && styles.multiline]}
              placeholder={placeholder}
              placeholderTextColor="#999"
              value={value?.toString() || ""}
              onChangeText={(text) =>
                onChange(textParseInt ? parseInt(text || "0", 10) : text)
              }
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              keyboardType={textParseInt ? "numeric" : "default"}
              multiline={multiline}
            />

            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                {isPasswordVisible ? (
                  <Eye size={20} color="#555" />
                ) : (
                  <EyeOff size={20} color="#555" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {(error || errorMessage) && (
            <Text style={styles.errorText}>
              {error?.message || errorMessage || "Invalid input"}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  required: {
    color: "#f00",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  eyeIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: "#f00",
    fontSize: 14,
    marginTop: 4,
  },
});

export default FormField;
