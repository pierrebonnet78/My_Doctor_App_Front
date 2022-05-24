import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";

import ChatScreen from "../screens/ChatScreen";
import HomePageScreen from "../screens/HomePageScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomePageScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      {/* <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
