import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/navigation/Main";

import DarkTheme from "./src/components/theme/DarkTheme";
import LightTheme from "./src/components/theme/LightTheme";

import { ThemeContext } from "./src/context/ThemeContext";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const themeContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme
    };
  }); 

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      <ThemeContext.Provider value={themeContext}>
        <Main />
      </ThemeContext.Provider>
    </NavigationContainer>
  );
}


export default App;
