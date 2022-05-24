import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppointmentScreen from "../screens/AppointmentScreen";
import AccountNavigator from "./AccountNavigator";
import HomeNavigator from "./HomeNavigator";
import ChatNavigator from "./ChatNavigator";
import colors from "../config/colors";
const Tab = createBottomTabNavigator();

function AppNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Doctors"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="magnify" size={25} />,
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="calendar-month-outline" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="chat-processing-outline" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-circle-outline" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppNavigator;
