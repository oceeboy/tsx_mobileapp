import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { THEME } from "@/constants/theme";

interface HeaderBoxProps {
  title: string;
  message: string;
}
const HeaderBox: FC<HeaderBoxProps> = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default HeaderBox;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: THEME.FONT_SIZE.XLARGE,
    fontWeight: "bold",
  },
  message: {
    fontSize: THEME.FONT_SIZE.MEDIUM,
    color: THEME.TEXT.SECONDARY,
  },
});
