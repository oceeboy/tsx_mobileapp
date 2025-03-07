import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Drawer = ({ active }: { active: { value: boolean } }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: active.value
          ? withTiming(0, { duration: 300 }) // Slide in
          : withTiming(-240, { duration: 300 }), // Slide out (hidden)
      },
    ],
  }));

  return (
    <Animated.View style={[styles.drawer, animatedStyle]}>
      <View style={styles.drawerContent}>
        <Text style={styles.title}>Drawer Menu</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  drawer: {
    ...StyleSheet.absoluteFillObject,
    width: 230, // Drawer width
    backgroundColor: "green",
    zIndex: -99, // Drawer is behind content
    left: 0,
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
  },
});
