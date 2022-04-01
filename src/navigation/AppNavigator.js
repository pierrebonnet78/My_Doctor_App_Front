import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CalendarScreen from "../screens/CalendarScreen";
import ProfilScreen from "../screens/ProfilScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function AppNavigator(props) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
export default AppNavigator;
