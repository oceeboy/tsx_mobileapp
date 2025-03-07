import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedValue } from "react-native-reanimated";
import { Menu, ShoppingCart } from "lucide-react-native";
import { AlignLeft } from "react-native-feather";
import { THEME } from "@/constants/theme";

interface HeaderUniversalProps {
  // Props here
  active: SharedValue<boolean>;
}

const HeaderUniversal: React.FC<HeaderUniversalProps> = ({ active }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable
        onPress={() => {
          active.value = true;
        }}
        style={styles.handBurgerMenu}
      >
        <AlignLeft color="white" width={24} height={24} />
      </Pressable>

      <Pressable>
        <ShoppingCart color="white" size={24} />
      </Pressable>
    </View>
  );
};

export default HeaderUniversal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: THEME.BACKGROUND.SECONDARY,
    justifyContent: "space-between",
  },
  handBurgerMenu: {
    flexDirection: "column",

    height: "100%",
    padding: 10,
  },
  handBurgerMenuLine: {
    width: 20,
    height: 2,
    backgroundColor: "white",
    margin: 2,
  },
  headerTitle: {
    flex: 1,
  },
  shoppingCart: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
