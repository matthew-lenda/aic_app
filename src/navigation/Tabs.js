import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import { useTheme } from "@react-navigation/native";
const BottomTab = createBottomTabNavigator();

function Tabs() {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2272FF",
        tabBarInactiveTintColor: colors.bottomTabIconColor,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: "#2272FF",
        },
        headerTitleAlign: "center",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#2272FF" : colors.bottomTabIconColor}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="magnifying-glass"
              size={24}
              color={focused ? "#2272FF" : colors.bottomTabIconColor}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="bookmark"
              size={24}
              color={focused ? "#2272FF" : colors.bottomTabIconColor}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={24}
              color={focused ? "#2272FF" : colors.bottomTabIconColor}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default Tabs;
