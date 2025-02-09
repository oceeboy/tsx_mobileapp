import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
interface OverLayProps {
  active: SharedValue<boolean>;
}
const Overlay = ({ active }: OverLayProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      display: active.value ? "flex" : "none",
    };
  });
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        style={styles.container}
        onPress={() => {
          active.value = false;
        }}
      />
    </Animated.View>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
