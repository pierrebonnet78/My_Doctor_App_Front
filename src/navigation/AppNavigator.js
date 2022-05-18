import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomePageScreen from "../screens/HomePageScreen";
import AccountScreen from "../screens/AccountScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import AccountNavigator from "./AccountNavigator";
const Tab = createBottomTabNavigator();

function AppNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePageScreen}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={20} />,
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="calendar-month" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppNavigator;
