import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import HeaderUniversal from "@/components/header/HeaderUniversal";
import Animated, { useSharedValue } from "react-native-reanimated";
import Overlay from "@/components/layercontrol/OverLay";
import { use3DTransform } from "@/hooks/drawer/useDrawer";
import Drawer from "@/components/navigation/Drawer";
import { ShoppingBasketIcon, User } from "lucide-react-native";
import { Home } from "react-native-feather";
import { THEME } from "@/constants/theme";

const TabLayout = () => {
  const active = useSharedValue(false);

  const animatedStyle = use3DTransform(active);
  return (
    <>
      <Animated.View style={[{ flex: 1, zIndex: 9999 }, animatedStyle]}>
        <HeaderUniversal active={active} />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              bottom: 0,
              backgroundColor: "white",
            },
            tabBarActiveTintColor: THEME.TABBAR.ACTIVE,
            tabBarInactiveTintColor: THEME.TABBAR.INACTIVE,

            tabBarBackground() {
              return (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "red",
                  }}
                />
              );
            },
          }}
        >
          <Tabs.Screen
            name="home"
            key="home-tab"
            options={{
              tabBarLabel: (props) => (
                <Text style={{ fontSize: 12, color: props.color }}>Home</Text>
              ),
              tabBarIcon(props) {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Home color={props.color} width={24} height={24} />
                  </View>
                );
              },
            }}
          />
          <Tabs.Screen
            name="favourite"
            key="favourite-tab"
            options={{
              tabBarLabel: (props) => (
                <Text style={{ fontSize: 12, color: props.color }}>
                  Favourite
                </Text>
              ),
              tabBarIcon(props) {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingBasketIcon
                      color={props.color}
                      width={24}
                      height={24}
                    />
                  </View>
                );
              },
            }}
          />
          <Tabs.Screen
            name="profile"
            key="profile-tab"
            options={{
              tabBarLabel: (props) => (
                <Text style={{ fontSize: 12, color: props.color }}>
                  Profile
                </Text>
              ),
              tabBarIcon(props) {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <User color={props.color} width={24} height={24} />
                  </View>
                );
              },
            }}
          />
        </Tabs>
        <Overlay active={active} />
      </Animated.View>
      <Drawer active={active} />
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
