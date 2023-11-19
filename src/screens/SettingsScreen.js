import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@react-navigation/native";

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  return (
    <View style={{ backgroundColor: colors.primary, flex: 1, alignItems: "center"}}>
      <TouchableOpacity
        onPress={() => setIsDarkTheme((current) => !current)}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: "#2260ff",
          backgroundColor: colors.opposite,
          marginTop: 10
        }}
      >
        <Text style={{ color: colors.primary, fontSize: 16 }}>{isDarkTheme ? 'Switch to Light' : 'Switch to Dark'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
