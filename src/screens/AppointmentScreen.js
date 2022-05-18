import React from "react";
import { View, StyleSheet, Text } from "react-native";

function AppointmentScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is the Appointment Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
});
export default AppointmentScreen;
