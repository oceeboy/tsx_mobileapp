import { Platform, StyleSheet, Text, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";

import { THEME } from "../constants/theme";
import { Check, X } from "react-native-feather";
import React from "react";

type ToastIt = {
  title: string;
  description: string;
};

export const toastConfig: ToastConfig = {
  success: ({ props }: { props: ToastIt }) => {
    return (
      <View style={[styles.container, styles.successContainer]}>
        <View style={styles.row}>
          <Text style={styles.sucessTitle}>{props.title}</Text>
          <Check
            width={20}
            height={20}
            color={THEME.colors.toastText.success}
          />
        </View>
        <Text style={styles.successDesc}>{props.description}</Text>
      </View>
    );
  },
  error: ({ props }: { props: ToastIt }) => {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <View style={styles.row}>
          <Text style={styles.errorTitle}>{props.title}</Text>
          <X width={20} height={20} color={THEME.colors.toastText.error} />
        </View>
        <Text style={styles.errorDesc}>{props.description}</Text>
      </View>
    );
  },
  info: ({ props }: { props: ToastIt }) => {
    return (
      <View style={[styles.container, styles.infoContainer]}>
        <View>
          <Text style={styles.infoTitle}>{props.title}</Text>
          <Check width={20} height={20} color={THEME.colors.toastText.info} />
        </View>
        <Text style={styles.infoDesc}>{props.description}</Text>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    top: Platform.OS === "ios" ? 14 : 0,
    padding: 10,
    paddingHorizontal: 13,
    width: "90%",
    rowGap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  successContainer: {
    backgroundColor: THEME.colors.toastBg.success,
  },
  errorContainer: {
    backgroundColor: THEME.colors.toastBg.error,
  },
  sucessTitle: {
    color: THEME.colors.toastText.success,
    fontSize: THEME.FONT_SIZE.h2,
    fontWeight: "semibold",
  },
  errorTitle: {
    color: THEME.colors.toastText.error,
    fontSize: THEME.FONT_SIZE.h2,
    fontWeight: "semibold",
  },
  successDesc: {
    color: THEME.colors.toastText.success,
    fontSize: THEME.FONT_SIZE.body1,
  },
  errorDesc: {
    color: THEME.colors.toastText.error,
    fontSize: THEME.FONT_SIZE.body1,
  },
  //info

  infoContainer: {
    backgroundColor: THEME.colors.toastBg.info,
  },
  infoTitle: {
    color: THEME.colors.toastText.info,
    fontSize: THEME.FONT_SIZE.h2,
    fontWeight: "semibold",
  },
  infoDesc: {
    color: THEME.colors.toastText.info,
    fontSize: THEME.FONT_SIZE.body1,
  },
});
