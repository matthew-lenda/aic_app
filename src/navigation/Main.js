import React from "react";
import Tabs from "./Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ImageDetailsScreen from "../screens/ImageDetailsScreen";
import AuthorScreen from "../screens/AuthorDetailsScreen";
import { useTheme } from '@react-navigation/native';
const Stack = createStackNavigator();

const Main = () => {
  const { colors } = useTheme();
  
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: "#2272FF",
        },
        headerTitleAlign: "center",
        headerTintColor: "#2272FF"
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageDetails"
        component={ImageDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "Image Details",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="AuthorDetails"
        component={AuthorScreen}
        options={{
          headerShown: true,
          headerTitle: "Author Details",
          headerBackTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
