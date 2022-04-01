import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/rootNavigation";
import navigationTheme from "./src/navigation/navigationTheme";
import LoginScreen from "./src/screens/LoginScreen";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
